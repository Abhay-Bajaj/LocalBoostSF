import { useState } from "react";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";
import BusinessCard from "../components/BusinessCard";

const businesses = [
    { id: 1, "DBA Name": "Golden Gate Cafe", "Street Address": "Market St", City: "San Francisco", State: "CA" },
    { id: 2, "DBA Name": "Mission Morning Cafe", "Street Address": "Mission District", City: "San Francisco", State: "CA" },
    { id: 3, "DBA Name": "Bay Brew House", "Street Address": "Sunset", City: "San Francisco", State: "CA" },
    { id: 4, "DBA Name": "Fog City Coffee", "Street Address": "Downtown", City: "San Francisco", State: "CA" },

    { id: 5, "DBA Name": "SF Burger Spot", "Street Address": "SoMa", City: "San Francisco", State: "CA" },
    { id: 6, "DBA Name": "Golden Bun Burgers", "Street Address": "Richmond", City: "San Francisco", State: "CA" },
    { id: 7, "DBA Name": "Bay Area Smash Burger", "Street Address": "Castro", City: "San Francisco", State: "CA" },
    { id: 8, "DBA Name": "Mission Burger Co.", "Street Address": "Mission District", City: "San Francisco", State: "CA" },

    { id: 9, "DBA Name": "QuickFix Services", "Street Address": "Outer Sunset", City: "San Francisco", State: "CA" },
    { id: 10, "DBA Name": "SF Cleaning Services", "Street Address": "Bayview", City: "San Francisco", State: "CA" },
    { id: 11, "DBA Name": "Local Tech Service", "Street Address": "Downtown", City: "San Francisco", State: "CA" },
    { id: 12, "DBA Name": "Bay Errand Services", "Street Address": "Market St", City: "San Francisco", State: "CA" },

    { id: 13, "DBA Name": "Little Italian Kitchen", "Street Address": "North Beach", City: "San Francisco", State: "CA" },
    { id: 14, "DBA Name": "Italian Pasta by the Bay", "Street Address": "Marina", City: "San Francisco", State: "CA" },
    { id: 15, "DBA Name": "Roma Italian SF", "Street Address": "North Beach", City: "San Francisco", State: "CA" },
    { id: 16, "DBA Name": "Tony’s Italian Corner", "Street Address": "Mission Bay", City: "San Francisco", State: "CA" },
];

const categories = ["cafe", "burger", "service", "italian"];

function Browse() {
    const [showLogin, setShowLogin] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(
                selectedCategories.filter((item) => item !== category)
            );
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const filteredBusinesses =
        selectedCategories.length === 0
            ? businesses
            : businesses.filter((business) => {
                const businessName = (
                    business["DBA Name"] ||
                    business["Ownership Name"] ||
                    ""
                ).toLowerCase();

                return selectedCategories.some((category) =>
                    businessName.includes(category.toLowerCase())
                );
            });

    return (
        <>
            <Navbar onLoginClick={() => setShowLogin(true)} />

            <div className="browse-page">
                <aside className="filter-sidebar">
                    <h3>Categories</h3>

                    {categories.map((category) => (
                        <label key={category} className="category-option">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => toggleCategory(category)}
                            />
                            <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                        </label>
                    ))}
                </aside>

                <main className="browse-content">
                    <h1>Browse Local Businesses</h1>
                    <p>Search and discover small businesses around San Francisco.</p>

                    <div className="business-grid">
                        {filteredBusinesses.map((business) => (
                            <BusinessCard key={business.id} business={business} />
                        ))}
                    </div>
                </main>
            </div>

            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        </>
    );
}

export default Browse;