import React from 'react';
import Button from '../components/Button';
import './FooterPages.css';

const Contact = () => {
    return (
        <div className="footer-page-container">
            <div className="footer-page-content">
                <h1>Contact Us</h1>
                <p className="page-intro">
                    We'd love to hear from you. Whether you have a question about our scents,
                    pricing, or anything else, our team is ready to answer all your questions.
                </p>

                <div className="contact-grid">
                    <div className="contact-info">
                        <h3>Get in Touch</h3>
                        <p><strong>Email:</strong> support@lessence.com</p>
                        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                        <p><strong>Address:</strong><br />123 Fragrance Lane,<br />Paris, France 75001</p>
                    </div>

                    <form className="contact-form">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="page-input" placeholder="Your Name" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="page-input" placeholder="Your Email" />
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea className="page-input" rows="5" placeholder="How can we help?"></textarea>
                        </div>
                        <Button>Send Message</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
