import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft, MapPin, Phone, Share2, CheckCircle2, TrendingUp, Zap, Sparkles } from 'lucide-react';
import { PRODUCTS, ALL_SUBCATEGORIES } from '../data/mockData';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
    const { id } = useParams();
    const [qty, setQty] = useState(1);
    const [isContacting, setIsContacting] = useState(false);

    const product = useMemo(() => PRODUCTS.find((p) => p.id === id), [id]);
    const subcat = useMemo(() => ALL_SUBCATEGORIES.find(s => s.id === product?.subcategoryId), [product]);

    if (!product) {
        return (
            <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
                <h2>Product not found</h2>
                <Link to="/marketplace" className="btn btn-primary" style={{ marginTop: '20px' }}>Back to Marketplace</Link>
            </div>
        );
    }

    const handleContact = () => {
        setIsContacting(true);
        setTimeout(() => {
            setIsContacting(false);
            toast.success('Seller contact details copied to clipboard!');
            navigator.clipboard.writeText(product.seller.contact);
        }, 800);
    };

    const handleShare = () => {
        toast.success('Product link copied to clipboard!');
        navigator.clipboard.writeText(window.location.href);
    };

    return (
        <main className="product-detail-page page-enter">
            <div className="container">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <Link to="/marketplace">Marketplace</Link> <span>/</span>
                    <Link to={`/products?subcategory=${subcat?.id}`}>{subcat?.name}</Link> <span>/</span>
                    <strong className="truncate">{product.name}</strong>
                </nav>

                <div className="pdp-grid">
                    {/* Left: Image */}
                    <div className="pdp-gallery">
                        <div className="pdp-main-img-wrap">
                            <img src={product.image} alt={product.name} className="pdp-main-img" />
                            {product.trending && (
                                <div className="pdp-badge trending">
                                    <TrendingUp size={14} /> Trending
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="pdp-info">
                        <div className="pdp-header">
                            <span className={`stock-badge ${product.inStock ? 'in' : 'out'}`}>
                                {product.inStock ? <CheckCircle2 size={14} /> : <X size={14} />}
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                            <h1 className="pdp-title">{product.name}</h1>
                            <p className="pdp-price">
                                <span className="val">₹{product.price.toLocaleString()}</span>
                                <span className="unit">/{product.unit}</span>
                            </p>
                        </div>

                        <p className="pdp-desc">{product.description}</p>

                        {/* AI Insights Card (Antigravity Feature) */}
                        <div className="ai-insight-card">
                            <div className="ai-header">
                                <Sparkles size={16} /> <span>Price Trend Insight <b>(AI)</b></span>
                            </div>
                            <p className="ai-desc">
                                Prices for {subcat?.name} have been stable over the last 30 days. Current price of ₹{product.price}/{product.unit} is within the regional average for {product.seller.location}. Good time to source!
                            </p>
                        </div>

                        <div className="pdp-meta-grid">
                            <div className="meta-item">
                                <span className="meta-label">Quantity Available</span>
                                <span className="meta-val">{product.quantity.toLocaleString()} {product.unit}s</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Minimum Order</span>
                                <span className="meta-val">Ask Seller</span>
                            </div>
                        </div>

                        <div className="pdp-actions">
                            <div className="qty-selector">
                                <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                                <input type="number" value={qty} onChange={e => setQty(Number(e.target.value) || 1)} />
                                <button onClick={() => setQty(qty + 1)}>+</button>
                            </div>

                            <button
                                className={`btn btn-primary btn-lg flex-1 ${!product.inStock || isContacting ? 'disabled' : ''}`}
                                onClick={handleContact}
                                id="contact-seller-btn"
                            >
                                {isContacting ? 'Loading...' : <><Phone size={18} /> Contact Seller</>}
                            </button>

                            <button className="btn btn-outline-green btn-circle" onClick={handleShare} aria-label="Share">
                                <Share2 size={18} />
                            </button>
                        </div>

                        {/* Seller Card */}
                        <div className="pdp-seller-card">
                            <h3 className="seller-title">Sold By</h3>
                            <div className="seller-name">{product.seller.name}</div>
                            <div className="seller-loc">
                                <MapPin size={14} /> {product.seller.location}, Kerala
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}

function X({ size }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    );
}
