'use client';

import { useEffect, useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductCard from './ProductCard';
import type { Product, Category } from '@/lib/types';

interface ProductsViewProps {
  initialCategory?: string;
  searchQuery?: string;
  onViewDetail: (product: Product) => void;
}

export default function ProductsView({ initialCategory, searchQuery, onViewDetail }: ProductsViewProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'todos');
  const [search, setSearch] = useState(searchQuery || '');
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc'>('name');

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then((r) => r.json()),
      fetch('/api/categories').then((r) => r.json()),
    ]).then(([prods, cats]) => {
      setProducts(prods);
      setCategories(cats);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Sync props to state when they change - use the latest value
  const currentCategory = initialCategory || activeCategory;
  const currentSearch = searchQuery || search;

  const filteredProducts = useMemo(() => {
    let result = products;

    if (currentCategory !== 'todos') {
      result = result.filter((p) => p.categorySlug === currentCategory);
    }

    if (currentSearch.trim()) {
      const q = currentSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      default:
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, currentCategory, currentSearch, sortBy]);

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Productos</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 sm:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="hidden sm:block h-9 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="name">Nombre A-Z</option>
              <option value="price-asc">Menor precio</option>
              <option value="price-desc">Mayor precio</option>
            </select>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 custom-scrollbar">
          <button
            onClick={() => setActiveCategory('todos')}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              currentCategory === 'todos'
                ? 'bg-lecatex text-white'
                : 'bg-secondary text-secondary-foreground hover:bg-accent'
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currentCategory === cat.slug
                  ? 'bg-lecatex text-white'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Mobile sort */}
        {showFilters && (
          <div className="sm:hidden mb-4 p-3 bg-muted rounded-lg">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="name">Nombre A-Z</option>
              <option value="price-asc">Menor precio</option>
              <option value="price-desc">Mayor precio</option>
            </select>
          </div>
        )}

        {/* Products grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-muted rounded-lg" />
                <div className="mt-3 h-4 bg-muted rounded w-3/4" />
                <div className="mt-2 h-6 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg font-medium text-muted-foreground">No se encontraron productos</p>
            <p className="text-sm text-muted-foreground mt-1">Probá con otra búsqueda o categoría</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setActiveCategory('todos');
                setSearch('');
              }}
            >
              Ver todos los productos
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetail={onViewDetail}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
