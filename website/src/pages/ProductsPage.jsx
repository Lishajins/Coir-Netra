import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import { PRODUCTS, ALL_SUBCATEGORIES, KERALA_DISTRICTS } from '../data/mockData';
import { useFilterStore, useSearchStore } from '../store/store';
import ProductCard from '../components/ui/ProductCard';
import './ProductsPage.css';

export default function ProductsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const subcatId = searchParams.get('subcategory');
    const searchQ = searchParams.get('q');

    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const { query, setQuery } = useSearchStore();
    const filters = useFilterStore();

    const subcat = ALL_SUBCATEGORIES.find(s => s.id === subcatId);
    const title = searchQ ? `Search Results for "${searchQ}"` : (subcat?.name || 'All Products');

    const filteredProducts = useMemo(() => {
        let result = PRODUCTS;

        // Filter by subcategory
        if (subcatId) {
            result = result.filter(p => p.subcategoryId === subcatId);
        }

        // Filter by search query (from URL)
        if (searchQ) {
            const qs = searchQ.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(qs) ||
                p.seller.location.toLowerCase().includes(qs)
            );
        }

        // Filter by store filters
        if (filters.location) {
            result = result.filter(p => p.seller.location === filters.location);
        }
        if (filters.minPrice) {
            result = result.filter(p => p.price >= Number(filters.minPrice));
        }
        if (filters.maxPrice) {
            result = result.filter(p => p.price <= Number(filters.maxPrice));
        }

        return result;
    }, [subcatId, searchQ, filters]);

    return (
        <main className="products-page page-enter">
            <div className="container products-container">
                {/* Sidebar Filters */}
                <aside className={`products-sidebar ${mobileFilterOpen ? 'open' : ''}`} id="products-sidebar">
                    <div className="sidebar-header">
                        <h3>Filters</h3>
                        <button className="btn-sm btn-outline-green" onClick={filters.clearFilters} id="clear-filters">Clear</button>
                    </div>

                    <div className="filter-group">
                        <label><MapPin size={14} /> Location</label>
                        <select
                            value={filters.location}
                            onChange={e => filters.setLocation(e.target.value)}
                            className="filter-input"
                            id="filter-location"
                        >
                            <option value="">All Regions</option>
                            {KERALA_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Price Range (₹/kg)</label>
                        <div className="price-inputs">
                            <input
                                type="number"
                                placeholder="Min"
                                value={filters.minPrice}
                                onChange={e => filters.setMinPrice(e.target.value)}
                                className="filter-input"
                                id="filter-min-price"
                            />
                            <span>-</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={filters.maxPrice}
                                onChange={e => filters.setMaxPrice(e.target.value)}
                                className="filter-input"
                                id="filter-max-price"
                            />
                        </div>
                    </div>

                    {!subcatId && !searchQ && (
                        <div className="filter-group">
                            <label>Subcategory</label>
                            <select
                                value={subcatId || ''}
                                onChange={e => setSearchParams(e.target.value ? { subcategory: e.target.value } : {})}
                                className="filter-input"
                                id="filter-subcat"
                            >
                                <option value="">All Subcategories</option>
                                {ALL_SUBCATEGORIES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                    )}

                    <button className="btn btn-primary btn-sm mobile-filter-close" onClick={() => setMobileFilterOpen(false)}>Apply Filters</button>
                </aside>

                {/* Product Grid */}
                <section className="products-content">
                    <div className="products-header">
                        <h1 className="products-title">{title}</h1>
                        <div className="products-meta">
                            <span>{filteredProducts.length} items found</span>
                            <button className="mobile-filter-btn" onClick={() => setMobileFilterOpen(!mobileFilterOpen)} id="mobile-filter-btn">
                                <SlidersHorizontal size={18} /> Filters
                            </button>
                        </div>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="products-grid" id="product-grid">
                            {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    ) : (
                        <div className="no-results">
                            <div className="no-res-icon">🔍</div>
                            <h3>No products found</h3>
                            <p>Try adjusting your search or filters to find what you're looking for.</p>
                            <button className="btn btn-outline-green" onClick={filters.clearFilters} style={{ marginTop: '16px' }}>
                                Reset Filters
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
