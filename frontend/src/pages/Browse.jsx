import { useState } from "react";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";

function Browse() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            <Navbar onLoginClick={() => setShowLogin(true)} />

            <div className="container">
                <h1>Browse Local Businesses</h1>
                <p>Search and discover small businesses around San Francisco.</p>
            </div>

            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        </>
    );
}

export default Browse;