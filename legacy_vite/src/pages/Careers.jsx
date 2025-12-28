import React from 'react';
import Button from '../components/Button';
import './FooterPages.css';

const Careers = () => {
    return (
        <div className="footer-page-container">
            <div className="footer-page-content">
                <h1>Join Our Team</h1>
                <p className="page-intro">
                    Passion for perfume? We're always looking for talented individuals to join the L'ESSENCE family.
                </p>

                <div className="jobs-list">
                    <div className="job-card">
                        <div className="job-info">
                            <h3>Senior Perfumer</h3>
                            <span className="job-location">Paris, France</span>
                        </div>
                        <Button variant="outline" size="sm">Apply Now</Button>
                    </div>

                    <div className="job-card">
                        <div className="job-info">
                            <h3>Marketing Director</h3>
                            <span className="job-location">New York, USA (Remote)</span>
                        </div>
                        <Button variant="outline" size="sm">Apply Now</Button>
                    </div>

                    <div className="job-card">
                        <div className="job-info">
                            <h3>Customer Experience Specialist</h3>
                            <span className="job-location">Remote</span>
                        </div>
                        <Button variant="outline" size="sm">Apply Now</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Careers;
