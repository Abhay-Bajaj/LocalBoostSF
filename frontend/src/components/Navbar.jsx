import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ onLoginClick }) {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/browse?search=${encodeURIComponent(searchTerm)}`);
        } else {
            navigate("/browse");
        }
    };

    const handleDashboard = () => {
        // Default behavior (not signed in yet)
        console.log("Dashboard disabled until login is implemented");
    };

    return (
        <nav className="navbar">
            {/* Logo */}
            <Link to="/" className="navbar-logo">
                LocalBoostSF
            </Link>

            {/* Search Bar */}
            <div className="navbar-search">
                <input
                    type="text"
                    placeholder="Search local businesses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Buttons */}
            <div className="navbar-actions">
                <button className="button" onClick={handleSearch}>
                    Search
                </button>

                <button className="button" onClick={handleDashboard}>
                    Dashboard
                </button>

                <button className="button" onClick={onLoginClick}>
                    Sign In / Sign Up
                </button>
            </div>
        </nav>
    );
}

export default Navbar;