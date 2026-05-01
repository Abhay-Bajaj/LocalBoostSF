import { useState } from "react";

function SignupTabs() {
    const [activeTab, setActiveTab] = useState("customer");

    return (
        <div>
            <div className="tabs">
                <span
                    className={activeTab === "customer" ? "active-tab tab" : "tab"}
                    onClick={() => setActiveTab("customer")}
                >
                    Customer
                </span>

                <span
                    className={activeTab === "business" ? "active-tab tab" : "tab"}
                    onClick={() => setActiveTab("business")}
                >
                    Business Owner
                </span>
            </div>

            {activeTab === "business" && (
                <>
                    <input type="text" placeholder="Business Account Number" />
                    <input type="text" placeholder="Business Name" />
                </>
            )}

            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <button className="button">Create Account</button>
        </div>
    );
}

export default SignupTabs;