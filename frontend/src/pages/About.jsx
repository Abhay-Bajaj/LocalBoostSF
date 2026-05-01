import { useState } from "react";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";

function About() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            <Navbar onLoginClick={() => setShowLogin(true)} />

            <div className="container">
                <h1>About LocalBoostSF</h1>
                <p>
                    LocalBoostSF helps San Francisco small businesses increase visibility
                    while helping customers discover local places to support.
                </p>
            </div>

            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        </>
    );
}

export default About;