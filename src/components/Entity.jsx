import React from 'react';

function Entity({ entityName, health }) {
    const displayName = entityName === "Player" ? "Your Health" : "Monster Health";
    const healthColor = health > 50 ? "#4CAF50" : health > 20 ? "#FFC107" : "#F44336";

    return (
        <section className="container">
            <h2>{displayName}</h2>
            <div className="healthbar">
                <div 
                    className="healthbar__value" 
                    style={{ width: `${health}%`, backgroundColor: healthColor }}
                ></div>
            </div>
        </section>
    );
}

export default Entity;