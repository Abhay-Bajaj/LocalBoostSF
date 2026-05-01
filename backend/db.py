import sqlite3
from pathlib import Path
from typing import Any, Dict, Iterable

DB_PATH = Path(__file__).resolve().parent / 'localboostsf.db'

SCHEMA_SQL = '''
CREATE TABLE IF NOT EXISTS businesses (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    address TEXT,
    account_number INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    is_business INTEGER DEFAULT 0,
    business_id TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    business_id TEXT NOT NULL,
    title TEXT,
    summary TEXT,
    content TEXT,
    image_path TEXT,
    date TEXT,
    views INTEGER DEFAULT 0,
    saves INTEGER DEFAULT 0,
    engagement_rate REAL DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS engagement (
    id TEXT PRIMARY KEY,
    post_id TEXT NOT NULL,
    views INTEGER DEFAULT 0,
    saves INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);
'''


def get_connection(db_path: Path = DB_PATH) -> sqlite3.Connection:
    connection = sqlite3.connect(str(db_path))
    connection.row_factory = sqlite3.Row
    connection.execute('PRAGMA foreign_keys = ON;')
    return connection


def init_db(db_path: Path = DB_PATH) -> Path:
    db_path.parent.mkdir(parents=True, exist_ok=True)
    with get_connection(db_path) as conn:
        conn.executescript(SCHEMA_SQL)
    return db_path


def row_to_dict(row: sqlite3.Row) -> Dict[str, Any]:
    return {key: row[key] for key in row.keys()} if row else {}


def rows_to_list(rows: Iterable[sqlite3.Row]) -> list[Dict[str, Any]]:
    return [row_to_dict(row) for row in rows]


def seed_demo_data(db_path: Path = DB_PATH) -> Path:
    with get_connection(db_path) as conn:
        conn.execute(
            'INSERT OR IGNORE INTO businesses (id, name, category, address, phone, email, description, followers, monthly_reach, rating, review_count, hours, account_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            (
                'business-001',
                'SoMa Sourdough Co.',
                'Bakery & Cafe',
                '123 Market Street, San Francisco, CA',
                '(415) 555-0123',
                'hello@somasourdough.com',
                'A modern neighborhood bakery serving freshly baked sourdough, coffee, and seasonal pastries.',
                5280,
                18740,
                4.8,
                152,
                'Mon–Sat 7am–4pm',
                987654321,
            ),
        )
        conn.executemany(
            'INSERT OR IGNORE INTO posts (id, business_id, title, summary, date, views, likes, comments, saves, engagement_rate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                (
                    'post-001',
                    'business-001',
                    'Weekend Brunch Special',
                    'Join us this weekend for our new brioche French toast and locally roasted espresso.',
                    '2026-04-28',
                    1420,
                    220,
                    34,
                    12,
                    18.5,
                ),
                (
                    'post-002',
                    'business-001',
                    'Fresh Tomato Basil Focaccia',
                    'Our sourdough focaccia is back with garden-fresh tomatoes and basil from local farms.',
                    '2026-04-21',
                    980,
                    140,
                    18,
                    8,
                    16.2,
                ),
                (
                    'post-003',
                    'business-001',
                    'Community Coffee Tasting',
                    'Reserve your seat for our free coffee tasting event this Thursday evening.',
                    '2026-04-14',
                    1105,
                    174,
                    23,
                    5,
                    17.8,
                ),
            ],
        )
    return db_path


def get_business_by_id(business_id: str, db_path: Path = DB_PATH) -> Dict[str, Any]:
    with get_connection(db_path) as conn:
        row = conn.execute('SELECT * FROM businesses WHERE id = ?', (business_id,)).fetchone()
        return row_to_dict(row)


def get_businesses(db_path: Path = DB_PATH) -> list[Dict[str, Any]]:
    with get_connection(db_path) as conn:
        rows = conn.execute('SELECT * FROM businesses ORDER BY name').fetchall()
        return rows_to_list(rows)


def get_posts_by_business_id(business_id: str, db_path: Path = DB_PATH) -> list[Dict[str, Any]]:
    with get_connection(db_path) as conn:
        rows = conn.execute('SELECT * FROM posts WHERE business_id = ? ORDER BY date DESC', (business_id,)).fetchall()
        return rows_to_list(rows)


def get_posts(db_path: Path = DB_PATH) -> list[Dict[str, Any]]:
    with get_connection(db_path) as conn:
        rows = conn.execute('SELECT * FROM posts ORDER BY date DESC').fetchall()
        return rows_to_list(rows)


def create_post(post_data: Dict[str, Any], db_path: Path = DB_PATH) -> Dict[str, Any]:
    with get_connection(db_path) as conn:
        conn.execute(
            'INSERT INTO posts (id, business_id, title, summary, content, image_path, date, views, likes, comments, saves, engagement_rate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            (
                post_data['id'],
                post_data['business_id'],
                post_data.get('title'),
                post_data.get('summary'),
                post_data.get('content'),
                post_data.get('image_path'),
                post_data.get('date'),
                post_data.get('views', 0),
                post_data.get('likes', 0),
                post_data.get('comments', 0),
                post_data.get('saves', 0),
                post_data.get('engagement_rate', 0.0),
            ),
        )
        return get_post_by_id(post_data['id'], db_path)


def get_post_by_id(post_id: str, db_path: Path = DB_PATH) -> Dict[str, Any]:
    with get_connection(db_path) as conn:
        row = conn.execute('SELECT * FROM posts WHERE id = ?', (post_id,)).fetchone()
        return row_to_dict(row)


def get_business_stats(business_id: str, db_path: Path = DB_PATH) -> Dict[str, Any]:
    with get_connection(db_path) as conn:
        post_rows = conn.execute('SELECT * FROM posts WHERE business_id = ?', (business_id,)).fetchall()
        posts = rows_to_list(post_rows)

    stats = {
        'totalPosts': len(posts),
        'totalViews': sum(post.get('views', 0) for post in posts),
        'totalLikes': sum(post.get('likes', 0) for post in posts),
        'totalComments': sum(post.get('comments', 0) for post in posts),
        'averageEngagement': 0.0,
        'topPost': None,
    }

    if posts:
        total_engagement = sum(post.get('likes', 0) + post.get('comments', 0) for post in posts)
        stats['averageEngagement'] = round(total_engagement / len(posts), 1)
        stats['topPost'] = max(posts, key=lambda post: post.get('engagement_rate', 0.0))

    return stats


if __name__ == '__main__':
    db_file = init_db()
    print(f'Initialized SQLite database at: {db_file}')
    seed_demo_data()
    print('Seeded demo business and posts data.')
