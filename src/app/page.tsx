'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/lecatex/Header';
import Footer from '@/components/lecatex/Footer';
import WhatsAppButton from '@/components/lecatex/WhatsAppButton';
import HeroSection from '@/components/lecatex/HeroSection';
import FeaturedProducts from '@/components/lecatex/FeaturedProducts';
import CategoriesSection from '@/components/lecatex/CategoriesSection';
import ShippingBanner from '@/components/lecatex/ShippingBanner';
import ProductsView from '@/components/lecatex/ProductsView';
import ProductDetailModal from '@/components/lecatex/ProductDetailModal';
import CartDrawer from '@/components/lecatex/CartDrawer';
import CheckoutView from '@/components/lecatex/CheckoutView';
import SuccessView from '@/components/lecatex/SuccessView';
import type { Product } from '@/lib/types';

type ViewType = 'home' | 'products' | 'categories' | 'checkout' | 'success';

export default function HomePage() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [orderData, setOrderData] = useState<{
    orderNumber: string;
    total: number;
    items: { name: string; quantity: number; price: number }[];
  } | null>(null);

  const handleNavigate = useCallback((view: string) => {
    setCurrentView(view as ViewType);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setSelectedCategory(undefined);
  }, []);

  const handleCategorySelect = useCallback((slug: string) => {
    setSelectedCategory(slug);
    setSearchQuery('');
    setCurrentView('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleViewDetail = useCallback((product: Product) => {
    setDetailProduct(product);
    setDetailOpen(true);
  }, []);

  const handleCheckout = useCallback(() => {
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOrderSuccess = useCallback((data: { orderNumber: string; total: number; items: { name: string; quantity: number; price: number }[] }) => {
    setOrderData(data);
    setCurrentView('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackHome = useCallback(() => {
    setOrderData(null);
    setSearchQuery('');
    setSelectedCategory(undefined);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onSearch={handleSearch}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <HeroSection onNavigate={handleNavigate} />
              <FeaturedProducts onNavigate={handleNavigate} onViewDetail={handleViewDetail} />
              <CategoriesSection onCategorySelect={handleCategorySelect} />
              <ShippingBanner />
            </motion.div>
          )}

          {currentView === 'products' && (
            <motion.div
              key="products"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <ProductsView
                initialCategory={selectedCategory}
                searchQuery={searchQuery}
                onViewDetail={handleViewDetail}
              />
            </motion.div>
          )}

          {currentView === 'categories' && (
            <motion.div
              key="categories"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <section className="py-8 sm:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Nuestras Categorías</h1>
                  <CategoriesSection onCategorySelect={handleCategorySelect} />
                </div>
              </section>
            </motion.div>
          )}

          {currentView === 'checkout' && (
            <motion.div
              key="checkout"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <CheckoutView
                onBack={() => handleNavigate('products')}
                onSuccess={handleOrderSuccess}
              />
            </motion.div>
          )}

          {currentView === 'success' && orderData && (
            <motion.div
              key="success"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <SuccessView
                orderNumber={orderData.orderNumber}
                total={orderData.total}
                items={orderData.items}
                onBackHome={handleBackHome}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer onNavigate={handleNavigate} />
      <WhatsAppButton />

      {/* Cart Drawer */}
      <CartDrawer onCheckout={handleCheckout} />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={detailProduct}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </div>
  );
}
