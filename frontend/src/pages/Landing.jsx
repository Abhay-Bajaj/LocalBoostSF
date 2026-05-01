import { useState } from "react";
import LoginModal from "../components/LoginModal";

function Landing() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="landing-container">
            <h1>LocalBoostSF</h1>
            <p>Helping San Francisco small businesses get discovered.</p>

            <div className="landing-buttons">
                <a href="/browse">
                    <button className="button">Browse Businesses</button>
                </a>

                <button className="button" onClick={() => setShowLogin(true)}>
                    Sign In / Sign Up
                </button>
            </div>

            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        </div>
    );
}

export default Landing;