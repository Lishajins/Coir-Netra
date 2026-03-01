import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Filter, Menu, X, Leaf, LogIn, LayoutDashboard } from 'lucide-react';
import { useAuthStore, useSearchStore } from '../../store/store';
import './Navbar.css';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const { isAuthenticated, logout } = useAuthStore();
    const { query, setQuery } = useSearchStore();
    const navigate = useNavigate();
    const location = useLocation();
    const inputRef = useRef(null);

    const showSearch = !['/', '/auth'].includes(location.pathname);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    };

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    return (
        <nav className="navbar" id="main-navbar">
            <div className="container navbar-inner">
                {/* Logo */}
                <Link to="/" className="navbar-logo" id="nav-logo">
                    <div className="logo-icon"><Leaf size={18} /></div>
                    <span>Coir <strong>Netra</strong></span>
                </Link>

                {/* Search bar — shown on inner pages */}
                {showSearch && (
                    <form className="navbar-search" onSubmit={handleSearch} id="nav-search-form">
                        <div className="search-wrap">
                            <Search size={16} className="search-icon" />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search products, categories, sellers..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="search-input"
                                id="nav-search-input"
                            />
                            {query && (
                                <button type="button" className="search-clear" onClick={() => setQuery('')} id="nav-search-clear">
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                        <button type="submit" className="search-btn" id="nav-search-submit">Search</button>
                    </form>
                )}

                {/* Desktop Nav */}
                <div className="navbar-actions">
                    {isAuthenticated ? (
                        <>
                            <Link to="/seller/dashboard" className="nav-link" id="nav-dashboard">
                                <LayoutDashboard size={16} /> Dashboard
                            </Link>
                            <button className="btn btn-outline-green btn-sm" onClick={logout} id="nav-logout">Logout</button>
                        </>
                    ) : (
                        <Link to="/auth" className="btn btn-primary btn-sm" id="nav-seller-login">
                            <LogIn size={15} /> Seller Login
                        </Link>
                    )}
                    <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} id="nav-hamburger" aria-label="Toggle menu">
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`} id="mobile-drawer">
                {showSearch && (
                    <form className="mobile-search" onSubmit={handleSearch}>
                        <Search size={15} />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            id="mobile-search-input"
                        />
                    </form>
                )}
                <Link to="/marketplace" className="drawer-link" id="mobile-marketplace">Marketplace</Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/seller/dashboard" className="drawer-link" id="mobile-dashboard">Dashboard</Link>
                        <button className="drawer-link" onClick={logout} id="mobile-logout">Logout</button>
                    </>
                ) : (
                    <Link to="/auth" className="drawer-link highlight" id="mobile-login">Seller Login</Link>
                )}
            </div>
        </nav>
    );
}
