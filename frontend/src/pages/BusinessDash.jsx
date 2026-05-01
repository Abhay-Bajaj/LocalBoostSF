import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoginModal from '../components/LoginModal';

export default function BusinessDash() {
    const [business, setBusiness] = useState(null);
    const [posts, setPosts] = useState([]);
    const [showLogin, setShowLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadDashboard() {
            try {
                const ownerBusiness = await getBusinessForCurrentOwner();
                setBusiness(ownerBusiness);
                const businessPosts = await getPostsByBusinessId(ownerBusiness.id);
                setPosts(businessPosts);
            } finally {
                setIsLoading(false);
            }
        }

        loadDashboard();
    }, []);

    const stats = useMemo(() => {
        const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
        const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
        const totalComments = posts.reduce((sum, post) => sum + post.comments, 0);
        const averageEngagement = posts.length
            ? ((totalLikes + totalComments) / posts.length).toFixed(1)
            : '0.0';

        const bestPost = posts.slice().sort((a, b) => b.engagementRate - a.engagementRate)[0];

        return {
            totalPosts: posts.length,
            totalViews,
            totalLikes,
            totalComments,
            averageEngagement,
            topPost: bestPost,
        };
    }, [posts]);

    return (
        <>
            <Navbar onLoginClick={() => setShowLogin(true)} />

            <div className="container business-dashboard">
                <div className="dashboard-hero">
                    <div>
                        <h1>Business Owner Dashboard</h1>
                        <p>Manage your business profile, view your posts, and track audience engagement in one place.</p>
                    </div>
                    <div>
                        <Link to="/create-post">
                            <button className="button">Create New Post</button>
                        </Link>
                    </div>
                </div>

                {business && <BusinessCard business={business} />}

                <div className="dashboard-summary">
                    <div className="summary-card">
                        <h3>Posts Published</h3>
                        <p className="summary-value">{stats.totalPosts}</p>
                    </div>
                    <div className="summary-card">
                        <h3>Total Views</h3>
                        <p className="summary-value">{stats.totalViews.toLocaleString()}</p>
                    </div>
                    <div className="summary-card">
                        <h3>Average Engagement</h3>
                        <p className="summary-value">{stats.averageEngagement}%</p>
                    </div>
                </div>

                <div className="dashboard-row">
                    <section className="post-list">
                        <div className="section-header">
                            <h2>Recent Posts</h2>
                        </div>

                        {posts.length > 0 ? (
                            posts.map((post) => <PostCard key={post.id} post={post} />)
                        ) : (
                            <div className="empty-state">
                                <p>No posts are available yet. Start by creating a new post.</p>
                            </div>
                        )}
                    </section>

                    <aside className="engagement-panel">
                        <h2>Engagement Statistics</h2>
                        <ul className="stats-list">
                            <li className="stat-item">
                                <span>Total Likes</span>
                                <strong>{stats.totalLikes}</strong>
                            </li>
                            <li className="stat-item">
                                <span>Total Comments</span>
                                <strong>{stats.totalComments}</strong>
                            </li>
                            <li className="stat-item">
                                <span>Best Performing Post</span>
                                <strong>{stats.topPost ? stats.topPost.title : 'N/A'}</strong>
                            </li>
                            <li className="stat-item">
                                <span>Best Post Engagement</span>
                                <strong>{stats.topPost ? `${stats.topPost.engagementRate}%` : 'N/A'}</strong>
                            </li>
                        </ul>
                    </aside>
                </div>
            </div>

            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        </>
    );
}
