'use client';

import Image from 'next/image';
import { ShoppingCart, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/lib/types';
import { useCartStore } from '@/store/cart';

interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product) => void;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export { formatPrice };

export default function ProductCard({ product, onViewDetail }: ProductCardProps) {
  const { addItem } = useCartStore();

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden border border-border/60 hover:shadow-lg hover:border-lecatex/30 transition-all duration-300 bg-white">
      <div className="relative aspect-square overflow-hidden bg-warm-gray-light cursor-pointer" onClick={() => onViewDetail(product)}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white shadow-md"
            >
              <Eye className="h-4 w-4 mr-1" />
              Ver detalle
            </Button>
          </div>
        </div>
        {/* Badges */}
        {discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-lecatex text-white border-0 text-[11px] px-2">
            -{discount}%
          </Badge>
        )}
        {!product.inStock && (
          <Badge className="absolute top-2 right-2 bg-muted text-muted-foreground border-0 text-[11px]">
            Sin stock
          </Badge>
        )}
        {product.featured && discount === 0 && (
          <Badge className="absolute top-2 left-2 bg-amber-warm text-white border-0 text-[11px] px-2">
            Destacado
          </Badge>
        )}
      </div>

      <CardContent className="p-3 sm:p-4">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3
          className="text-sm font-semibold leading-tight mb-2 line-clamp-2 cursor-pointer hover:text-lecatex transition-colors"
          onClick={() => onViewDetail(product)}
        >
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-lecatex">
            {formatPrice(product.price)}
          </span>
          {product.comparePrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">x {product.unit}</span>
          <Button
            size="sm"
            className="bg-lecatex hover:bg-lecatex-dark text-white h-8 text-xs px-3"
            onClick={(e) => {
              e.stopPropagation();
              addItem(product);
            }}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-3.5 w-3.5 mr-1" />
            Agregar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
