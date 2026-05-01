import { useState } from "react";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";
import GeneralUserDashboard from "./GeneralUserDashboard";

function Dashboard() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            <Navbar onLoginClick={() => setShowLogin(true)} />

            <GeneralUserDashboard />

            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        </>
    );
}

export default Dashboard;
