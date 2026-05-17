'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { Category } from '@/lib/types';

interface CategoriesSectionProps {
  onCategorySelect: (slug: string) => void;
}

export default function CategoriesSection({ onCategorySelect }: CategoriesSectionProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categoryImages: Record<string, string> = {
    'revestimientos-plasticos': '/products/lecatex-plastico-20.jpg',
    'revestimientos-texturados': '/products/lecatex-rustico-20.jpg',
    'revestimientos-al-agua': '/products/lecatex-agua-20.jpg',
    'enduidos': '/products/lecatex-enduido-10.jpg',
    'pinturas': '/products/lecatex-latex-20.jpg',
    'accesorios': '/products/rodillo.jpg',
  };

  return (
    <section className="py-12 sm:py-16 bg-warm-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold">Nuestras Categorías</h2>
          <p className="text-muted-foreground mt-1">Todo lo que necesitás para tu próximo proyecto</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-muted rounded-xl" />
                <div className="mt-2 h-4 bg-muted rounded w-2/3 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Card
                key={cat.id}
                className="group cursor-pointer overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-white"
                onClick={() => onCategorySelect(cat.slug)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={categoryImages[cat.slug] || '/products/lecatex-plastico-20.jpg'}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <h3 className="text-xs sm:text-sm font-semibold text-white leading-tight">
                      {cat.name}
                    </h3>
                  </div>
                </div>
                <CardContent className="p-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">
                      {cat.productCount || 0} productos
                    </span>
                    <ArrowRight className="h-3 w-3 text-lecatex group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
