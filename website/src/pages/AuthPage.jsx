import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, Leaf } from 'lucide-react';
import { useAuthStore } from '../store/store';
import './AuthPage.css';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [form, setForm] = useState({ email: '', password: '', confirm: '' });
    const [loading, setLoading] = useState(false);
    const { login } = useAuthStore();
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            toast.error('Please fill in all fields');
            return;
        }
        if (!isLogin && form.password !== form.confirm) {
            toast.error('Passwords do not match');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            login({ email: form.email, name: form.email.split('@')[0] });
            toast.success(isLogin ? 'Welcome back! 🌿' : 'Account created! Welcome to Coir Netra 🌿');
            navigate('/seller/dashboard');
        }, 1200);
    };

    return (
        <main className="auth-page page-enter">
            <div className="auth-left">
                <img src="/hero1.png" alt="Kerala coir industry" className="auth-bg-img" />
                <div className="auth-left-overlay" />
                <div className="auth-left-content">
                    <div className="auth-logo">
                        <div className="auth-logo-icon"><Leaf size={20} /></div>
                        <span>Coir <strong>Netra</strong></span>
                    </div>
                    <h2 className="auth-left-title">Join Kerala's Unified Coir Marketplace</h2>
                    <p className="auth-left-sub">
                        Reach thousands of buyers across India and the world. List your coir products for free today.
                    </p>
                    <ul className="auth-benefits">
                        <li>✅ Free seller registration</li>
                        <li>✅ Direct buyer connections</li>
                        <li>✅ AI-powered market insights</li>
                        <li>✅ No middlemen, more profit</li>
                    </ul>
                </div>
            </div>

            <div className="auth-right">
                <div className="auth-card" id="auth-form-card">
                    <div className="auth-card-logo">
                        <div className="logo-icon"><Leaf size={16} /></div>
                        <span className="auth-card-brand">Coir <strong>Netra</strong></span>
                    </div>
                    <h1 className="auth-card-title">
                        {isLogin ? 'Welcome Back' : 'Create Seller Account'}
                    </h1>
                    <p className="auth-card-sub">
                        {isLogin ? 'Sign in to access your seller dashboard' : 'Start selling coir products today'}
                    </p>

                    <form className="auth-form" onSubmit={handleSubmit} id="auth-form">
                        <div className="form-field" id="field-email">
                            <label className="form-label">Email Address</label>
                            <div className="input-wrap">
                                <Mail size={15} className="input-icon" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="form-input"
                                    id="auth-email"
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="form-field" id="field-password">
                            <label className="form-label">Password</label>
                            <div className="input-wrap">
                                <Lock size={15} className="input-icon" />
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Min. 8 characters"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="form-input"
                                    id="auth-password"
                                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                                />
                                <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)} id="auth-toggle-pass">
                                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                        </div>

                        {!isLogin && (
                            <div className="form-field" id="field-confirm">
                                <label className="form-label">Confirm Password</label>
                                <div className="input-wrap">
                                    <Lock size={15} className="input-icon" />
                                    <input
                                        type="password"
                                        name="confirm"
                                        placeholder="Repeat password"
                                        value={form.confirm}
                                        onChange={handleChange}
                                        className="form-input"
                                        id="auth-confirm"
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>
                        )}

                        <button type="submit" className={`btn btn-primary auth-submit ${loading ? 'loading' : ''}`} id="auth-submit" disabled={loading}>
                            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
                        </button>
                    </form>

                    <div className="auth-toggle">
                        {isLogin ? (
                            <p>Don't have an account?{' '}
                                <button onClick={() => setIsLogin(false)} id="switch-to-signup">Sign Up</button>
                            </p>
                        ) : (
                            <p>Already have an account?{' '}
                                <button onClick={() => setIsLogin(true)} id="switch-to-login">Login</button>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
