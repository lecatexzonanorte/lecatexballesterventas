'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { ShoppingCart, Minus, Plus, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/store/cart';
import { formatPrice } from './ProductCard';
import type { Product } from '@/lib/types';

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({ product, open, onClose }: ProductDetailModalProps) {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();

  // Reset state when product changes - using key on Dialog instead of useEffect
  const handleOpenChange = useCallback((isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  }, [onClose]);

  // Use product as key to reset state when product changes
  const productKey = product?.id || 'empty';

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent key={productKey} className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        {product && (
          <ProductDetailContent
            product={product}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            quantity={quantity}
            setQuantity={setQuantity}
            added={added}
            setAdded={setAdded}
            addItem={addItem}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function ProductDetailContent({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  added,
  setAdded,
  addItem,
}: {
  product: Product;
  selectedColor: string;
  setSelectedColor: (c: string) => void;
  selectedSize: string;
  setSelectedSize: (s: string) => void;
  quantity: number;
  setQuantity: (q: number) => void;
  added: boolean;
  setAdded: (a: boolean) => void;
  addItem: (product: Product, color?: string, size?: string) => void;
}) {
  // Set defaults if not yet set
  const currentColor = selectedColor || product.colors[0] || '';
  const currentSize = selectedSize || product.sizes[0] || '';

  const handleAddToCart = () => {
    addItem(product, currentColor, currentSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
      {/* Image */}
      <div className="relative aspect-square bg-warm-gray-light">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {product.comparePrice && (
          <Badge className="absolute top-4 left-4 bg-lecatex text-white border-0">
            -{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
          </Badge>
        )}
      </div>

      {/* Details */}
      <div className="p-5 sm:p-6 flex flex-col">
        <DialogHeader className="p-0 mb-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {product.category}
          </p>
          <DialogTitle className="text-xl sm:text-2xl font-bold leading-tight">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl sm:text-3xl font-bold text-lecatex">
            {formatPrice(product.price)}
          </span>
          {product.comparePrice && (
            <span className="text-base text-muted-foreground line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Precio por {product.unit} · Stock: {product.stockQty} unidades
        </p>

        <Separator className="mb-4" />

        {/* Colors */}
        {product.colors.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">
              Color: <span className="text-muted-foreground font-normal">{currentColor}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                    currentColor === color
                      ? 'border-lecatex bg-lecatex/10 text-lecatex font-medium'
                      : 'border-border hover:border-lecatex/50'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        {product.sizes.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">
              Presentación: <span className="text-muted-foreground font-normal">{currentSize}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                    currentSize === size
                      ? 'border-lecatex bg-lecatex/10 text-lecatex font-medium'
                      : 'border-border hover:border-lecatex/50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Cantidad</p>
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center text-sm font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setQuantity(Math.min(product.stockQty, quantity + 1))}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-xs text-muted-foreground">
              Subtotal: {formatPrice(product.price * quantity)}
            </span>
          </div>
        </div>

        {/* Add to cart */}
        <Button
          size="lg"
          className={`w-full font-semibold text-base h-12 transition-all ${
            added
              ? 'bg-green-600 hover:bg-green-600 text-white'
              : 'bg-lecatex hover:bg-lecatex-dark text-white'
          }`}
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {added ? (
            <>
              <Check className="mr-2 h-5 w-5" />
              ¡Agregado al carrito!
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Agregar al carrito
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
