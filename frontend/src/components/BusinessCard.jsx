function BusinessCard({ business }) {
    const name = business["DBA Name"] || business["Ownership Name"] || "Unknown Business";
    const street = business["Street Address"] || "Address unavailable";
    const city = business["City"] || "";
    const state = business["State"] || "";

    return (
        <div className="business-card">
            <div className="business-card-body">
                <h3>{name}</h3>
                <p className="business-location">
                    {street}
                    {city && `, ${city}`}
                    {state && `, ${state}`}
                </p>
            </div>
        </div>
    );
}

export default BusinessCard;