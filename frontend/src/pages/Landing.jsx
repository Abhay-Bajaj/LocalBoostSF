import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";

function Landing() {
    const [showLogin, setShowLogin] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        const query = searchQuery.trim();
        navigate(query ? `/browse?search=${encodeURIComponent(query)}` : "/browse");
    };

    return (
        <div className="landing-container">
            <section className="landing-card" aria-label="LocalBoost SF welcome">
                <div className="landing-logo" aria-hidden="true">
                    LB
                </div>

                <h1>LocalBoost SF</h1>
                <p>Discover and support San Francisco small businesses.</p>

                <form className="landing-search" onSubmit={handleSearch}>
                    <input
                        type="search"
                        placeholder="Search by business name or category"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        aria-label="Search businesses"
                    />
                    <button className="button" type="submit">
                        Search
                    </button>
                </form>

                <div className="landing-buttons">
                    <Link to="/browse" className="landing-link">
                        <button className="button" type="button">
                            Browse Businesses
                        </button>
                    </Link>

                    <button
                        className="button secondary-landing-button"
                        type="button"
                        onClick={() => setShowLogin(true)}
                    >
                        Sign In / Sign Up
                    </button>
                </div>
            </section>

            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        </div>
    );
}

export default Landing;
