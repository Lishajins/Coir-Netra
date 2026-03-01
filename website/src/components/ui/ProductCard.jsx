import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, TrendingUp } from 'lucide-react';
import './ProductCard.css';

export default function ProductCard({ product }) {
    if (!product) return null;
    const { id, name, price, unit, seller, image, inStock, trending, subcategoryId } = product;

    return (
        <article className="product-card" id={`product-card-${id}`}>
            <div className="card-img-wrap">
                <img src={image} alt={name} className="card-img" loading="lazy" />
                {trending && (
                    <span className="card-badge trending"><TrendingUp size={12} /> Trending</span>
                )}
                {!inStock && (
                    <div className="card-out-overlay">Out of Stock</div>
                )}
            </div>
            <div className="card-body">
                <h3 className="card-name">{name}</h3>
                <div className="card-meta">
                    <MapPin size={13} />
                    <span>{seller.location}</span>
                </div>
                <div className="card-footer">
                    <div className="card-price">
                        <span className="price-val">₹{price.toLocaleString()}</span>
                        <span className="price-unit">/{unit}</span>
                    </div>
                    <Link
                        to={`/product/${id}`}
                        className={`card-btn ${!inStock ? 'disabled' : ''}`}
                        id={`view-product-${id}`}
                    >
                        View <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </article>
    );
}
