import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Leaf, ShoppingBag, Users, Star } from 'lucide-react';
import './WelcomePage.css';

const SLIDES = [
    {
        image: '/hero1.png',
        title: 'The Heart of Kerala\'s Coir Industry',
        sub: "Alappuzha — where centuries of tradition meet a digital future",
    },
    {
        image: '/hero2.png',
        title: 'Crafted by Artisans, Delivered to the World',
        sub: "Connect with skilled coir weavers and fibre processors across Kerala",
    },
    {
        image: '/hero3.png',
        title: 'From Coconut Husk to Global Markets',
        sub: "The complete coir supply chain — now in one unified marketplace",
    },
];

const STATS = [
    { icon: <Users size={24} />, value: '1,200+', label: 'Registered Sellers' },
    { icon: <ShoppingBag size={24} />, value: '8,500+', label: 'Active Listings' },
    { icon: <Leaf size={24} />, value: '14', label: 'Districts Covered' },
    { icon: <Star size={24} />, value: '4.8★', label: 'Seller Rating' },
];

const WHY_ITEMS = [
    {
        icon: '🌿',
        title: 'Farm-to-Market Transparency',
        desc: 'Eliminate middlemen. Buyers connect directly with coconut farmers, fibre processors, and artisans.',
    },
    {
        icon: '🔍',
        title: 'Intelligent Search & Discovery',
        desc: 'Search across products, categories, subcategories, and seller names — all in one universal bar.',
    },
    {
        icon: '🤖',
        title: 'AI-Powered Insights',
        desc: 'CoirBot helps buyers source smartly and gives sellers real-time demand analytics.',
    },
    {
        icon: '📍',
        title: 'Hyper-Local to Global',
        desc: 'Browse by district. Filter by location. Whether you\'re in Kerala or exporting globally — we\'ve got you.',
    },
];

export default function WelcomePage() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((c) => (c + 1) % SLIDES.length);
        }, 4500);
        return () => clearInterval(timer);
    }, []);

    const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
    const next = () => setCurrent((c) => (c + 1) % SLIDES.length);

    return (
        <main className="welcome-page page-enter">
            {/* Hero Slideshow */}
            <section className="hero-section" id="hero">
                <div className="hero-slides">
                    {SLIDES.map((slide, i) => (
                        <div
                            key={i}
                            className={`hero-slide ${i === current ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="hero-overlay" />
                            <div className="hero-content">
                                <span className="hero-chip">Kerala Coir Marketplace</span>
                                <h1 className="hero-title">{slide.title}</h1>
                                <p className="hero-sub">{slide.sub}</p>
                                <div className="hero-cta">
                                    <Link to="/auth" className="btn btn-primary" id="hero-register">
                                        Register as a Seller
                                    </Link>
                                    <Link to="/marketplace" className="btn btn-outline" id="hero-explore">
                                        Explore Products <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Controls */}
                <button className="slide-arrow left" onClick={prev} id="slide-prev" aria-label="Previous slide">
                    <ChevronLeft size={22} />
                </button>
                <button className="slide-arrow right" onClick={next} id="slide-next" aria-label="Next slide">
                    <ChevronRight size={22} />
                </button>
                <div className="slide-dots">
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            className={`dot ${i === current ? 'active' : ''}`}
                            onClick={() => setCurrent(i)}
                            id={`slide-dot-${i}`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </section>

            {/* Stats Bar */}
            <section className="stats-bar" id="stats">
                <div className="container stats-grid">
                    {STATS.map((s, i) => (
                        <div className="stat-item" key={i}>
                            <div className="stat-icon">{s.icon}</div>
                            <div>
                                <div className="stat-value">{s.value}</div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Industry Description */}
            <section className="about-section" id="about">
                <div className="container about-inner">
                    <div className="about-text">
                        <span className="section-tag">About the Industry</span>
                        <h2 className="section-title">Alappuzha — The Coir Capital of the World</h2>
                        <p className="about-para">
                            Kerala's coir industry is a 150-year-old tradition employing over <strong>300,000 workers</strong>
                            — the majority in Alappuzha district. India is the world's largest coir producer, and Kerala
                            accounts for nearly <strong>70% of global coir output</strong>.
                        </p>
                        <p className="about-para">
                            Yet despite this scale, the industry remains fragmented — farmers, processors, artisans,
                            and exporters operate in silos with no digital connective tissue. <strong>Coir Netra</strong> is
                            built to change that — one listing at a time.
                        </p>
                        <Link to="/marketplace" className="btn btn-outline-green" id="about-explore">
                            Explore the Marketplace <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="about-img-wrap">
                        <img src="/hero2.png" alt="Coir artisan at work" className="about-img" />
                        <div className="about-badge">
                            <Leaf size={20} />
                            <span>100% Natural & Sustainable</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Coir Netra */}
            <section className="why-section" id="why">
                <div className="container">
                    <div className="why-header">
                        <span className="section-tag">Why Coir Netra</span>
                        <h2 className="section-title">Everything the Coir Industry Needs</h2>
                        <p className="section-subtitle">
                            A unified platform designed for every participant in the coir supply chain.
                        </p>
                    </div>
                    <div className="why-grid">
                        {WHY_ITEMS.map((item, i) => (
                            <div className="why-card" key={i} id={`why-card-${i}`}>
                                <div className="why-icon">{item.icon}</div>
                                <h3 className="why-title">{item.title}</h3>
                                <p className="why-desc">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="cta-section" id="cta">
                <div className="container cta-inner">
                    <div>
                        <h2 className="cta-title">Ready to join Kerala's digital coir revolution?</h2>
                        <p className="cta-sub">Register as a seller today — it's free, fast, and reaches thousands of buyers.</p>
                    </div>
                    <div className="cta-actions">
                        <Link to="/auth" className="btn btn-primary" id="cta-register">
                            Register as a Seller
                        </Link>
                        <Link to="/marketplace" className="btn btn-outline" id="cta-browse">
                            Browse Products
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
