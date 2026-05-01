import { useState } from "react";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";

function CreatePost() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            <Navbar onLoginClick={() => setShowLogin(true)} />

            <div className="container">
                <h1>Create AI Post</h1>
                <p>Business owners can generate captions, hashtags, promo text, and calls-to-action here.</p>
            </div>

            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        </>
    );
}

export default CreatePost;