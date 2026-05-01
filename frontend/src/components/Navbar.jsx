import { Link } from "react-router-dom";

function Navbar({ onLoginClick }) {
    return (
        <nav className="navbar">
            <h2>LocalBoostSF</h2>

            <input type="text" placeholder="Search local businesses..." />

            <div>
                <Link to="/browse">
                    <button className="button">Browse</button>
                </Link>

                <Link to="/dashboard">
                    <button className="button">Dashboard</button>
                </Link>

                <button className="button" onClick={onLoginClick}>
                    Sign In / Sign Up
                </button>
            </div>
        </nav>
    );
}

export default Navbar;