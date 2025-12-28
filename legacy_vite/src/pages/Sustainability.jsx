import React from 'react';
import './FooterPages.css';

const Sustainability = () => {
    return (
        <div className="footer-page-container">
            <div className="footer-page-content">
                <h1>Sustainability</h1>
                <p className="page-intro">
                    At L'ESSENCE, we are committed to crafting luxury fragrances while preserving the beauty of our planet.
                </p>

                <div className="content-section">
                    <h2>Ethically Sourced Ingredients</h2>
                    <p>
                        We work directly with farmers and distillers to ensure fair wages and sustainable farming practices.
                        Our sandalwood is harvested from renewable plantations, and our vetiver supports soil conservation projects.
                    </p>
                </div>

                <div className="content-section">
                    <h2>Eco-Conscious Packaging</h2>
                    <p>
                        Our bottles are made from 40% recycled glass and are fully recyclable.
                        We use FSC-certified paper for our boxes and have eliminated single-use plastics from our shipping materials.
                    </p>
                </div>

                <div className="content-section">
                    <h2>Cruelty-Free & Vegan</h2>
                    <p>
                        We never test on animals, and none of our products contain animal-derived ingredients.
                        Luxury should never come at the cost of compassion.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Sustainability;
