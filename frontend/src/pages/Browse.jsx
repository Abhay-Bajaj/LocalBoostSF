import { useState } from "react";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";
import BusinessCard from "../components/BusinessCard";

const businesses = [
    { id: 1, name: "Golden Gate Cafe", category: "cafe", address: "123 Market St, San Francisco, CA" },
    { id: 2, name: "Mission Morning Cafe", category: "cafe", address: "2450 Mission St, San Francisco, CA" },
    { id: 3, name: "Fog City Coffee", category: "cafe", address: "88 2nd St, San Francisco, CA" },
    { id: 4, name: "Bay Brew Cafe", category: "cafe", address: "1200 Irving St, San Francisco, CA" },
    { id: 5, name: "Sunset Espresso Bar", category: "cafe", address: "1701 Noriega St, San Francisco, CA" },
    { id: 6, name: "Castro Coffee Corner", category: "cafe", address: "401 Castro St, San Francisco, CA" },

    { id: 7, name: "SF Burger Spot", category: "burger", address: "550 Howard St, San Francisco, CA" },
    { id: 8, name: "Golden Bun Burgers", category: "burger", address: "320 Clement St, San Francisco, CA" },
    { id: 9, name: "Mission Burger Co.", category: "burger", address: "2100 Mission St, San Francisco, CA" },
    { id: 10, name: "Bay Area Smash Burger", category: "burger", address: "1501 Haight St, San Francisco, CA" },
    { id: 11, name: "Foggy Burger House", category: "burger", address: "899 Geary St, San Francisco, CA" },
    { id: 12, name: "Pier Burger Kitchen", category: "burger", address: "39 Pier, San Francisco, CA" },

    { id: 13, name: "QuickFix Services", category: "service", address: "700 Taraval St, San Francisco, CA" },
    { id: 14, name: "SF Clean Team", category: "service", address: "1400 Bayview Ave, San Francisco, CA" },
    { id: 15, name: "Local Tech Help", category: "service", address: "50 Fremont St, San Francisco, CA" },
    { id: 16, name: "Bay Errand Services", category: "service", address: "900 Valencia St, San Francisco, CA" },
    { id: 17, name: "Golden Gate Repair Service", category: "service", address: "4300 Geary Blvd, San Francisco, CA" },
    { id: 18, name: "Neighborhood Home Services", category: "service", address: "2200 Bryant St, San Francisco, CA" },

    { id: 19, name: "Little Italian Kitchen", category: "italian", address: "501 Columbus Ave, San Francisco, CA" },
    { id: 20, name: "Pasta by the Bay", category: "italian", address: "2201 Chestnut St, San Francisco, CA" },
    { id: 21, name: "Roma Italian SF", category: "italian", address: "601 Union St, San Francisco, CA" },
    { id: 22, name: "Tony’s Italian Corner", category: "italian", address: "300 Mission Bay Blvd, San Francisco, CA" },
    { id: 23, name: "North Beach Pasta House", category: "italian", address: "1458 Grant Ave, San Francisco, CA" },
    { id: 24, name: "Vesuvio Italian Bistro", category: "italian", address: "255 Columbus Ave, San Francisco, CA" },
    { id: 25, name: "Marina Italian Table", category: "italian", address: "2040 Lombard St, San Francisco, CA" },
];

const categories = ["cafe", "burger", "service", "italian"];

function Browse() {
    const [showLogin, setShowLogin] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((item) => item !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const filteredBusinesses =
        selectedCategories.length === 0
            ? businesses
            : businesses.filter((business) =>
                selectedCategories.includes(business.category)
            );

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