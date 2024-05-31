import React from 'react';
import './DashboardView.css';

const DashboardView: React.FC = () => {
    return (
        <div className="dashboard">
            <header className="header">
                <div className="search-container">
                    <input type="text" className="search-input" placeholder="Search..." />
                </div>
                <div className="filter-buttons">
                    <button className="filter-button active">Full Nature</button>
                    <button className="filter-button">Creative</button>
                    <button className="filter-button">In group</button>
                    <button className="filter-button">Serenity</button>
                    <button className="filter-button">Filtro</button>
                    <button className="filter-button">filtro</button>
                    <button className="filter-button">filtro</button>
                </div>
            </header>
            <main className="main-content">
                {[...Array(15)].map((_, index) => (
                    <div className="card" key={index}>
                        <img src="src/assets/imgDashboard.png" alt="Work Together" className="card-image" />
                        <div className="card-content">
                            <span className="badge">Guest favorite</span>
                            <h2 className="card-title">Work Together</h2>
                            <p className="card-location">Tagle 3000</p>
                            <p className="card-price">$5.000 per person</p>
                            <div className="card-footer">
                                <span className="rating">★ 4.89</span>
                            </div>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default DashboardView;
