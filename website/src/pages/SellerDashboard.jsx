import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Tag, ChevronDown, Check, User, MapPin, Package, BarChart3, TrendingUp, Search } from 'lucide-react';
import { useAuthStore } from '../store/store';
import { PRODUCTS, ALL_SUBCATEGORIES } from '../data/mockData';
import './SellerDashboard.css';

export default function SellerDashboard() {
    const { user } = useAuthStore();
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState(PRODUCTS.slice(0, 3)); // Mock seller's products

    // Add Product Form State
    const [form, setForm] = useState({ name: '', subcategoryId: '', price: '', quantity: '', image: null });

    const aiInsights = useMemo(() => [
        "Searches for 'Coco Peat Blocks' increased by 42% this week.",
        "Buyers from Maharashtra are highly active. Consider adding shipping options.",
        "Your 'Brown Coir Fibre' price is highly competitive."
    ], []);

    const handleStockToggle = (id) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p));
        toast.success('Stock status updated');
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (!form.name || !form.price || !form.quantity) {
            toast.error('Please fill all required fields');
            return;
        }

        const newProduct = {
            ...form,
            id: `new-${Date.now()}`,
            inStock: true,
            unit: 'kg',
            image: '/cat1.png' // Mock upload
        };

        setProducts([newProduct, ...products]);
        toast.success('Product added successfully!');
        setForm({ name: '', subcategoryId: '', price: '', quantity: '', image: null });
        setActiveTab('products');
    };

    return (
        <div className="dashboard-page page-enter">
            <div className="container dashboard-container">

                {/* Sidebar */}
                <aside className="dashboard-sidebar">
                    <div className="seller-profile-card">
                        <div className="seller-avatar">
                            {user?.name?.charAt(0).toUpperCase() || 'S'}
                        </div>
                        <h3 className="seller-name-d">{user?.name || 'Seller User'}</h3>
                        <p className="seller-loc-d"><MapPin size={12} /> Alappuzha, Kerala</p>
                    </div>

                    <nav className="dashboard-nav">
                        <button className={`d-nav-btn ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
                            <Package size={18} /> Manage Products
                        </button>
                        <button className={`d-nav-btn ${activeTab === 'add' ? 'active' : ''}`} onClick={() => setActiveTab('add')}>
                            <Plus size={18} /> Add New Product
                        </button>
                        <button className={`d-nav-btn ${activeTab === 'insights' ? 'active' : ''}`} onClick={() => setActiveTab('insights')}>
                            <BarChart3 size={18} /> AI Analytics
                        </button>
                        <button className={`d-nav-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                            <User size={18} /> Store Profile
                        </button>
                    </nav>

                    {/* AI Banner in Sidebar */}
                    <div className="ai-minibanner">
                        <div className="ai-mini-header"><TrendingUp size={14} /> AI Tip</div>
                        <p>Update your stock status regularly to rank higher in searches.</p>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="dashboard-content">

                    {/* Products Tab */}
                    {activeTab === 'products' && (
                        <div className="d-tab-content fade-in">
                            <div className="d-header">
                                <h2>Your Products</h2>
                                <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('add')}>
                                    <Plus size={16} /> Add Product
                                </button>
                            </div>

                            <div className="products-table-wrap">
                                <table className="products-table">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Stock (Qty)</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(p => (
                                            <tr key={p.id}>
                                                <td>
                                                    <div className="d-prod-cell">
                                                        <img src={p.image || '/cat1.png'} alt={p.name} className="d-prod-img" />
                                                        <div className="d-prod-info">
                                                            <span className="d-prod-name">{p.name}</span>
                                                            <span className="d-prod-cat">{ALL_SUBCATEGORIES.find(s => s.id === p.subcategoryId)?.name || 'Category'}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><span className="d-price">₹{p.price}/{p.unit}</span></td>
                                                <td>{p.quantity}</td>
                                                <td>
                                                    <label className="stock-toggle">
                                                        <input
                                                            type="checkbox"
                                                            checked={p.inStock}
                                                            onChange={() => handleStockToggle(p.id)}
                                                        />
                                                        <span className="track"></span>
                                                        <span className="thumb"></span>
                                                    </label>
                                                    <span className={`status-text ${p.inStock ? 'in' : 'out'}`}>
                                                        {p.inStock ? 'In Stock' : 'Out'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="d-actions">
                                                        <button className="d-icon-btn edit" title="Edit"><Edit2 size={16} /></button>
                                                        <button className="d-icon-btn delete" title="Delete"><Trash2 size={16} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {products.length === 0 && (
                                            <tr><td colSpan="5" className="text-center py-6">No products listed yet.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Add Product Tab */}
                    {activeTab === 'add' && (
                        <div className="d-tab-content fade-in">
                            <div className="d-header">
                                <h2>Add New Product</h2>
                            </div>

                            <form className="add-product-form" onSubmit={handleAddProduct}>
                                <div className="form-grid">
                                    <div className="form-group full-width">
                                        <label>Product Name*</label>
                                        <input
                                            type="text"
                                            className="d-input"
                                            placeholder="e.g. Premium White Coir Fibre"
                                            value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Subcategory*</label>
                                        <select
                                            className="d-input"
                                            value={form.subcategoryId}
                                            onChange={e => setForm({ ...form, subcategoryId: e.target.value })}
                                            required
                                        >
                                            <option value="">Select Subcategory...</option>
                                            {ALL_SUBCATEGORIES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Price per unit (₹)*</label>
                                        <input
                                            type="number"
                                            className="d-input"
                                            placeholder="e.g. 45"
                                            value={form.price}
                                            onChange={e => setForm({ ...form, price: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Quantity Available*</label>
                                        <input
                                            type="number"
                                            className="d-input"
                                            placeholder="e.g. 5000"
                                            value={form.quantity}
                                            onChange={e => setForm({ ...form, quantity: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="form-group full-width">
                                        <label>Product Image</label>
                                        <div className="image-upload-area">
                                            <div className="upload-icon"><Plus size={24} /></div>
                                            <p>Click to upload or drag and drop</p>
                                            <span>SVG, PNG, JPG or GIF (max 5MB)</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button type="button" className="btn btn-outline" onClick={() => setActiveTab('products')}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Save Product</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* AI Analytics Tab */}
                    {activeTab === 'insights' && (
                        <div className="d-tab-content fade-in">
                            <div className="d-header">
                                <h2>AI Market Analytics</h2>
                                <div className="ai-badge"><Sparkles size={14} /> Powered by Antigravity AI</div>
                            </div>

                            <div className="metrics-grid">
                                <div className="metric-card">
                                    <span className="m-label">Product Views (7d)</span>
                                    <span className="m-val">1,248</span>
                                    <span className="m-trend positive">↑ 12% vs last week</span>
                                </div>
                                <div className="metric-card">
                                    <span className="m-label">Buyer Leads</span>
                                    <span className="m-val">24</span>
                                    <span className="m-trend positive">↑ 3 new today</span>
                                </div>
                                <div className="metric-card">
                                    <span className="m-label">Search Appearances</span>
                                    <span className="m-val">3,842</span>
                                    <span className="m-trend negative">↓ 4% vs last week</span>
                                </div>
                            </div>

                            <h3 className="insights-title">Smart Actionable Insights</h3>
                            <div className="insights-list">
                                {aiInsights.map((insight, i) => (
                                    <div className="insight-card" key={i}>
                                        <div className="i-icon"><Zap size={20} /></div>
                                        <p>{insight}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}
