'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import type { Product } from '@/lib/types';

interface FeaturedProductsProps {
  onNavigate: (view: string) => void;
  onViewDetail: (product: Product) => void;
}

export default function FeaturedProducts({ onNavigate, onViewDetail }: FeaturedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products?featured=true')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Productos Destacados</h2>
            <p className="text-muted-foreground mt-1">Los más elegidos por profesionales</p>
          </div>
          <Button
            variant="ghost"
            className="text-lecatex hover:text-lecatex-dark hidden sm:flex"
            onClick={() => onNavigate('products')}
          >
            Ver todos
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-muted rounded-lg" />
                <div className="mt-3 h-4 bg-muted rounded w-3/4" />
                <div className="mt-2 h-6 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetail={onViewDetail}
              />
            ))}
          </div>
        )}

        <div className="mt-6 text-center sm:hidden">
          <Button
            variant="outline"
            className="border-lecatex text-lecatex hover:bg-lecatex hover:text-white"
            onClick={() => onNavigate('products')}
          >
            Ver todos los productos
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
