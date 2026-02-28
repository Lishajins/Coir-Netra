import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { CATEGORIES, SUBCATEGORIES } from '../data/mockData';
import './CategoryPage.css';

export default function CategoryPage() {
    const { slug } = useParams();
    const category = CATEGORIES.find(c => c.slug === slug);
    const subcats = category ? SUBCATEGORIES[category.id] : [];

    if (!category) {
        return (
            <div className="container page-enter" style={{ padding: '80px 0', textAlign: 'center' }}>
                <h2>Category not found</h2>
                <Link to="/marketplace" className="btn btn-primary" style={{ marginTop: '20px' }}>Back to Marketplace</Link>
            </div>
        );
    }

    return (
        <main className="category-page page-enter">
            {/* Category Hero */}
            <section
                className="cat-hero"
                style={{ backgroundImage: `url(${category.image})` }}
            >
                <div className="cat-hero-overlay" style={{ background: `linear-gradient(135deg, ${category.color}F2 0%, ${category.color}CC 100%)` }} />
                <div className="container cat-hero-content">
                    <Link to="/marketplace" className="back-link" id="back-to-market">
                        <ArrowLeft size={16} /> Back to Marketplace
                    </Link>
                    <h1 className="cat-hero-title">{category.name}</h1>
                    <p className="cat-hero-subtitle">{category.description}</p>
                </div>
            </section>

            {/* Subcategories Grid */}
            <section className="cat-subcats-section">
                <div className="container">
                    <div className="cat-subcats-header">
                        <h2 className="section-title">Select a Subcategory</h2>
                        <p className="section-subtitle">Choose a specific product type to view all relevant listings from our sellers.</p>
                    </div>

                    <div className="cat-subcats-grid">
                        {subcats.map(sub => (
                            <Link
                                key={sub.id}
                                to={`/products?subcategory=${sub.id}`}
                                className="cat-subcat-card"
                                id={`subcat-link-${sub.id}`}
                            >
                                <div className="cat-subcat-img-wrap">
                                    <img src={sub.image} alt={sub.name} className="cat-subcat-img" loading="lazy" />
                                    <div className="cat-subcat-img-overlay" />
                                </div>
                                <div className="cat-subcat-info">
                                    <h3 className="cat-subcat-name">{sub.name}</h3>
                                    <span className="cat-subcat-cta">
                                        View Products <ArrowRight size={14} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

// Arrow icon for cta
function ArrowRight({ size }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
        </svg>
    );
}
