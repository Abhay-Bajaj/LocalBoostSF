import { useState } from "react";
import SignupTabs from "./SignupTabs";

function LoginModal({ onClose }) {
    const [mode, setMode] = useState("login");

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                {mode === "login" ? (
                    <>
                        <h2>Login</h2>

                        <div className="modal-form">
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <button className="button">Login</button>
                        </div>

                        <button
                            className="secondary-button"
                            onClick={() => setMode("signup")}
                        >
                            Create an Account
                        </button>
                    </>
                ) : (
                    <>
                        <h2>Create an Account</h2>
                        <SignupTabs />

                        <button
                            className="secondary-button"
                            onClick={() => setMode("login")}
                        >
                            Back to Login
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default LoginModal;