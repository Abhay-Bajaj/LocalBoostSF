import { useState } from "react";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";

function Dashboard() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            <Navbar onLoginClick={() => setShowLogin(true)} />

            <div className="container">
                <h1>Dashboard</h1>
                <p>Your saved businesses, posts, and account information will appear here.</p>
            </div>

            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        </>
    );
}

export default Dashboard;