from datetime import date
import uuid

from flask import Flask, abort, jsonify, request
from flask_cors import CORS

from db import (
    create_post,
    get_business_by_id,
    get_business_stats,
    get_businesses,
    get_posts,
    get_posts_by_business_id,
    init_db,
    seed_demo_data,
)

app = Flask(__name__)
CORS(app)

# Ensure database exists and demo data is available during development.
init_db()
seed_demo_data()


@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'})


@app.route('/api/businesses', methods=['GET'])
def list_businesses():
    return jsonify(get_businesses())


@app.route('/api/businesses/current', methods=['GET'])
def current_business():
    business = get_business_by_id('business-001')
    if not business:
        abort(404, 'Current business not found')
    return jsonify(business)


@app.route('/api/businesses/<business_id>', methods=['GET'])
def get_business(business_id):
    business = get_business_by_id(business_id)
    if not business:
        abort(404, 'Business not found')
    return jsonify(business)


@app.route('/api/businesses/<business_id>/posts', methods=['GET'])
def business_posts(business_id):
    business = get_business_by_id(business_id)
    if not business:
        abort(404, 'Business not found')
    return jsonify(get_posts_by_business_id(business_id))


@app.route('/api/businesses/<business_id>/stats', methods=['GET'])
def business_stats(business_id):
    business = get_business_by_id(business_id)
    if not business:
        abort(404, 'Business not found')
    return jsonify(get_business_stats(business_id))


@app.route('/api/posts', methods=['GET', 'POST'])
def posts():
    if request.method == 'GET':
        business_id = request.args.get('business_id')
        if business_id:
            return jsonify(get_posts_by_business_id(business_id))
        return jsonify(get_posts())

    payload = request.get_json(silent=True) or {}
    if not payload.get('business_id') or not payload.get('title'):
        abort(400, 'business_id and title are required')

    new_post = {
        'id': uuid.uuid4().hex,
        'business_id': payload['business_id'],
        'title': payload.get('title'),
        'summary': payload.get('summary'),
        'content': payload.get('content'),
        'image_path': payload.get('image_path'),
        'date': payload.get('date', date.today().isoformat()),
        'views': payload.get('views', 0),
        'likes': payload.get('likes', 0),
        'comments': payload.get('comments', 0),
        'saves': payload.get('saves', 0),
        'engagement_rate': payload.get('engagement_rate', 0.0),
    }

    created = create_post(new_post)
    return jsonify(created), 201


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
