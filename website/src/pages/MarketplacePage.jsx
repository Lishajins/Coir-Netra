import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { CATEGORIES, ALL_SUBCATEGORIES } from '../data/mockData';
import './MarketplacePage.css';

export default function MarketplacePage() {
    const [activeSlides, setActiveSlides] = useState({ primary: 0, intermediate: 0, final: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlides((prev) => ({
                primary: (prev.primary + 1) % 3,
                intermediate: (prev.intermediate + 1) % 3,
                final: (prev.final + 1) % 3,
            }));
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <main className="marketplace-page page-enter">
            {/* Hero banner */}
            <section className="mp-hero" id="marketplace-hero">
                <div className="container mp-hero-inner">
                    <div>
                        <span className="section-tag">Kerala's Coir Marketplace</span>
                        <h1 className="mp-title">Discover the Finest Coir Products</h1>
                        <p className="mp-sub">From raw coconut husks to artisan doormats — everything in one place.</p>
                    </div>
                </div>
            </section>

            {/* Category Cards */}
            <section className="categories-section" id="categories">
                <div className="container">
                    <div className="sec-header">
                        <span className="section-tag">Browse by Category</span>
                        <h2 className="section-title">Three Pillars of the Coir Supply Chain</h2>
                    </div>
                    <div className="cat-grid">
                        {CATEGORIES.map((cat) => (
                            <Link
                                key={cat.id}
                                to={`/category/${cat.slug}`}
                                className="cat-card"
                                id={`cat-card-${cat.id}`}
                            >
                                <div
                                    className="cat-bg"
                                    style={{ backgroundImage: `url(${cat.image})` }}
                                />
                                <div className="cat-overlay" style={{ background: `linear-gradient(to top, ${cat.color}ee 0%, ${cat.color}88 40%, transparent 100%)` }} />
                                <div className="cat-content">
                                    <h3 className="cat-name">{cat.name}</h3>
                                    <p className="cat-desc">{cat.description}</p>
                                    <span className="cat-cta">
                                        Explore <ArrowRight size={15} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Subcategory Carousel */}
            <section className="subcats-section" id="subcategories">
                <div className="container">
                    <div className="sec-header">
                        <span className="section-tag">All Subcategories</span>
                        <h2 className="section-title">Browse by Product Type</h2>
                    </div>
                </div>
                <div className="subcat-scroll-wrap">
                    <div className="subcat-scroll" id="subcat-carousel">
                        {ALL_SUBCATEGORIES.map((sub) => {
                            const cat = CATEGORIES.find((c) => c.id === sub.categoryId);
                            return (
                                <Link
                                    key={sub.id}
                                    to={`/products?subcategory=${sub.id}`}
                                    className="subcat-tile"
                                    id={`subcat-${sub.id}`}
                                >
                                    <div className="subcat-bg" style={{ backgroundImage: `url(${sub.image})` }} />
                                    <div className="subcat-overlay" />
                                    <div className="subcat-content">
                                        <span className="subcat-cat-tag">{cat?.name.split(' ')[0]}</span>
                                        <p className="subcat-name">{sub.name}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Trending Products teaser */}
            <section className="trending-section" id="trending">
                <div className="container">
                    <div className="sec-header">
                        <span className="section-tag">Trending Now</span>
                        <h2 className="section-title">Most Popular This Week</h2>
                    </div>
                    <div className="trending-grid">
                        {[
                            { icon: '🌾', name: 'Brown Coir Fibre', searches: '1,240 searches' },
                            { icon: '🟫', name: 'Coco Peat Blocks', searches: '980 searches' },
                            { icon: '🪢', name: 'Coir Yarn (2-ply)', searches: '870 searches' },
                            { icon: '🪴', name: 'Coir Pith Loose', searches: '760 searches' },
                            { icon: '🧺', name: 'Handloom Mats', searches: '650 searches' },
                            { icon: '🌿', name: 'Coir Rope', searches: '540 searches' },
                        ].map((item, i) => (
                            <Link key={i} to={`/search?q=${encodeURIComponent(item.name)}`} className="trending-chip" id={`trending-${i}`}>
                                <span className="trend-icon">{item.icon}</span>
                                <span className="trend-name">{item.name}</span>
                                <span className="trend-searches">{item.searches}</span>
                                <ChevronRight size={14} />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
