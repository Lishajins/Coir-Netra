import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ChatBot from './components/ui/ChatBot';

// Pages
import WelcomePage from './pages/WelcomePage';
import MarketplacePage from './pages/MarketplacePage';
import AuthPage from './pages/AuthPage';
import CategoryPage from './pages/CategoryPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SellerDashboard from './pages/SellerDashboard';
import './App.css';

import { useAuthStore } from './store/store';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  return children;
};

export default function App() {
  return (
    <div className="app-layout">
      <ScrollToTop />
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/search" element={<ProductsPage />} />

          {/* Seller Routes */}
          <Route
            path="/seller/dashboard"
            element={
              <ProtectedRoute>
                <SellerDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}
