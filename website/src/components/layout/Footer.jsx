import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer" id="site-footer">
            <div className="footer-top">
                <div className="container footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <div className="logo-icon-sm"><Leaf size={16} /></div>
                            <span>Coir <strong>Netra</strong></span>
                        </div>
                        <p className="footer-tagline">
                            Kerala's unified digital marketplace for the coir industry — connecting farmers, artisans, and global buyers.
                        </p>
                        <div className="footer-socials">
                            <a href="#" aria-label="Facebook" id="footer-facebook"><Facebook size={18} /></a>
                            <a href="#" aria-label="Instagram" id="footer-instagram"><Instagram size={18} /></a>
                            <a href="#" aria-label="Twitter" id="footer-twitter"><Twitter size={18} /></a>
                        </div>
                    </div>

                    {/* Marketplace */}
                    <div className="footer-col">
                        <h4>Marketplace</h4>
                        <ul>
                            <li><Link to="/marketplace">All Products</Link></li>
                            <li><Link to="/category/primary-raw-materials">Raw Materials</Link></li>
                            <li><Link to="/category/intermediate-products">Intermediate Products</Link></li>
                            <li><Link to="/category/final-goods">Final Goods</Link></li>
                        </ul>
                    </div>

                    {/* Sellers */}
                    <div className="footer-col">
                        <h4>For Sellers</h4>
                        <ul>
                            <li><Link to="/auth">Register as Seller</Link></li>
                            <li><Link to="/seller/dashboard">Dashboard</Link></li>
                            <li><Link to="/auth">Login</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-col">
                        <h4>Contact</h4>
                        <ul className="contact-list">
                            <li><MapPin size={14} /> Alappuzha, Kerala, India</li>
                            <li><Mail size={14} /> info@coirnetra.in</li>
                            <li><Phone size={14} /> +91 94471 00000</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p>© 2025 Coir Netra. Empowering Kerala's Coir Industry.</p>
                    <p>Made with ❤ in Alappuzha, Kerala</p>
                </div>
            </div>
        </footer>
    );
}
