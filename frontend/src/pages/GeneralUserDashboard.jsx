import { useState } from "react";

const featuredPosts = [
    {
        id: 1,
        business: "Mission Bloom Cafe",
        category: "Coffee & Bakery",
        text: "Weekend pastry bundle with locally roasted coffee.",
        views: 128,
        saves: 24,
    },
    {
        id: 2,
        business: "Sunset Stitch Studio",
        category: "Retail",
        text: "Handmade tote drop inspired by San Francisco neighborhoods.",
        views: 96,
        saves: 18,
    },
    {
        id: 3,
        business: "Bay Roots Market",
        category: "Grocery",
        text: "Fresh produce box from Bay Area farms available this Friday.",
        views: 154,
        saves: 31,
    },
];

const savedBusinesses = [
    {
        id: 1,
        name: "Golden Gate Books",
        category: "Bookstore",
        location: "Richmond District",
    },
    {
        id: 2,
        name: "Fogline Florals",
        category: "Florist",
        location: "Hayes Valley",
    },
];

function GeneralUserDashboard() {
    const [searchQuery, setSearchQuery] = useState("");
    const [savedPostIds, setSavedPostIds] = useState([1]);
    const [savedBusinessIds, setSavedBusinessIds] = useState([1]);

    const toggleSavedPost = (postId) => {
        setSavedPostIds((currentIds) =>
            currentIds.includes(postId)
                ? currentIds.filter((id) => id !== postId)
                : [...currentIds, postId]
        );
    };

    const toggleSavedBusiness = (businessId) => {
        setSavedBusinessIds((currentIds) =>
            currentIds.includes(businessId)
                ? currentIds.filter((id) => id !== businessId)
                : [...currentIds, businessId]
        );
    };

    return (
        <main className="general-dashboard">
            <section className="dashboard-hero">
                <div>
                    <p className="dashboard-eyebrow">Customer Dashboard</p>
                    <h1>Welcome, User123</h1>
                    <p>
                        Find local businesses, keep track of favorite posts, and save
                        places to support around San Francisco.
                    </p>
                </div>
            </section>

            <section className="dashboard-search-panel">
                <div>
                    <h2>Search for a business</h2>
                    <p>Backend search results will connect here later.</p>
                </div>

                <form className="dashboard-search-form">
                    <input
                        type="search"
                        placeholder="Search by name, category, or neighborhood"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        aria-label="Search for a business"
                    />
                    <button className="button" type="button">
                        Search
                    </button>
                </form>
            </section>

            <section className="dashboard-grid">
                <div className="dashboard-panel dashboard-panel-large">
                    <div className="dashboard-section-heading">
                        <div>
                            <p className="dashboard-eyebrow">Local posts</p>
                            <h2>View and save posts</h2>
                        </div>
                    </div>

                    <div className="dashboard-post-list">
                        {featuredPosts.map((post) => {
                            const isSaved = savedPostIds.includes(post.id);

                            return (
                                <article className="dashboard-post-card" key={post.id}>
                                    <div>
                                        <p className="dashboard-card-label">{post.category}</p>
                                        <h3>{post.business}</h3>
                                        <p>{post.text}</p>
                                    </div>

                                    <div className="dashboard-card-footer">
                                        <span>{post.views} views</span>
                                        <span>{post.saves} saves</span>
                                        <button
                                            className={`save-button ${isSaved ? "saved" : ""}`}
                                            type="button"
                                            onClick={() => toggleSavedPost(post.id)}
                                        >
                                            {isSaved ? "Saved" : "Save Post"}
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>

                <aside className="dashboard-panel">
                    <div className="dashboard-section-heading">
                        <div>
                            <p className="dashboard-eyebrow">Saved places</p>
                            <h2>Saved businesses</h2>
                        </div>
                    </div>

                    <div className="saved-business-list">
                        {savedBusinesses.map((business) => {
                            const isSaved = savedBusinessIds.includes(business.id);

                            return (
                                <article className="saved-business-card" key={business.id}>
                                    <div>
                                        <h3>{business.name}</h3>
                                        <p>{business.category}</p>
                                        <span>{business.location}</span>
                                    </div>

                                    <button
                                        className={`save-button ${isSaved ? "saved" : ""}`}
                                        type="button"
                                        onClick={() => toggleSavedBusiness(business.id)}
                                    >
                                        {isSaved ? "Saved" : "Save"}
                                    </button>
                                </article>
                            );
                        })}
                    </div>
                </aside>
            </section>
        </main>
    );
}

export default GeneralUserDashboard;
