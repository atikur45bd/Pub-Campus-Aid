import React from 'react';
import myImage from './pub2.jpg';

const Home = () => {
    return (
        <div>

            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: `url(${myImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold text-white">Hello there</h1>
                        <p className="mb-5 text-2xl text-white">
                            Welcome to "PUB Campus Aide". Here you can explore some features which will be helpful in your daily campus life.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
