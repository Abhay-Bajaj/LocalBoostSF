function BusinessCard({ business }) {
    return (
        <div className="business-card">
            <div className="business-card-body">
                <h3>{business.name}</h3>
                <p className="business-location">{business.address}</p>
            </div>
        </div>
    );
}

export default BusinessCard;