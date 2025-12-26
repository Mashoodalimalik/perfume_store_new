import React from 'react';

const About = () => {
    return (
        <div className="container" style={{ padding: '8rem 1rem 4rem', textAlign: 'center' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Our Story</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                    At L'ESSENCE, we believe that fragrance is more than just a scent—it's a journey, a memory, and a statement.
                    Founded in 2024, our mission is to craft exceptional fragrances that resonate with the modern individual.
                    <br /><br />
                    We source the finest ingredients from around the globe, ensuring each bottle is a masterpiece of olfactory art.
                </p>
            </div>
        </div>
    );
};

export default About;
