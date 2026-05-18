'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Minus, Plus, Trash2, Truck, ChevronRight, RefreshCw } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCartStore } from '@/store/cart';
import { formatPrice } from './ProductCard';

interface CartDrawerProps {
  onCheckout: () => void;
}

interface ShippingOption {
  id: string;
  name: string;
  type: string;
  cost: number;
  originalCost: number;
  freeAbove: number | null;
  estimatedDays: string;
  isFree: boolean;
}

const provinces = [
  'CABA', 'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba',
  'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja',
  'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan',
  'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero',
  'Tierra del Fuego', 'Tucumán',
];

export default function CartDrawer({ onCheckout }: CartDrawerProps) {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const [province, setProvince] = useState('');
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);
  const [freeThreshold, setFreeThreshold] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);

  const subtotal = getSubtotal();

  const doCalculateShipping = useCallback(async (prov: string, sub: number) => {
    setCalculating(true);
    try {
      const res = await fetch('/api/shipping/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ province: prov, subtotal: sub }),
      });
      const data = await res.json();
      setShippingOptions(data.options || []);
      setFreeThreshold(data.freeShippingThreshold || null);
      if (data.options?.length > 0) {
        setSelectedShipping(data.options[0]);
      }
    } catch {
      // Error handled silently
    }
    setCalculating(false);
  }, []);

  const handleProvinceChange = useCallback((prov: string) => {
    setProvince(prov);
    if (items.length > 0) {
      doCalculateShipping(prov, subtotal);
    }
  }, [items.length, subtotal, doCalculateShipping]);

  const handleRecalculate = useCallback(() => {
    if (province) {
      doCalculateShipping(province, subtotal);
    }
  }, [province, subtotal, doCalculateShipping]);

  const shippingCost = selectedShipping?.cost || 0;
  const total = subtotal + shippingCost;

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && closeCart()}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2">
            Tu Carrito
            {items.length > 0 && (
              <Badge className="bg-lecatex text-white border-0 text-xs">
                {items.length} item{items.length !== 1 ? 's' : ''}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Truck className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium">Tu carrito está vacío</p>
            <p className="text-sm text-muted-foreground mt-1">
              Agregá productos para empezar
            </p>
            <Button
              className="mt-4 bg-lecatex hover:bg-lecatex-dark text-white"
              onClick={closeCart}
            >
              Ver productos
            </Button>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="flex gap-3 p-3 bg-muted/50 rounded-lg"
                >
                  <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-md overflow-hidden shrink-0 bg-warm-gray-light">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium leading-tight line-clamp-2">
                      {item.product.name}
                    </h4>
                    {(item.selectedColor || item.selectedSize) && (
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {[item.selectedColor, item.selectedSize].filter(Boolean).join(' · ')}
                      </p>
                    )}
                    <p className="text-sm font-semibold text-lecatex mt-1">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex items-center border border-border rounded-md">
                        <button
                          className="h-7 w-7 flex items-center justify-center hover:bg-muted"
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-medium">{item.quantity}</span>
                        <button
                          className="h-7 w-7 flex items-center justify-center hover:bg-muted"
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        className="h-7 w-7 flex items-center justify-center text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.product.id, item.selectedColor, item.selectedSize)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping & totals */}
            <div className="border-t border-border p-4 space-y-3 bg-white">
              {/* Province selector */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    Calcular envío
                  </label>
                  {shippingOptions.length > 0 && (
                    <button
                      onClick={handleRecalculate}
                      className="text-[10px] text-lecatex hover:text-lecatex-dark flex items-center gap-0.5"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Recalcular
                    </button>
                  )}
                </div>
                <Select value={province} onValueChange={handleProvinceChange}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Seleccioná tu provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Shipping options */}
              {shippingOptions.length > 0 && (
                <div className="space-y-1.5">
                  {shippingOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedShipping(opt)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                        selectedShipping?.id === opt.id
                          ? 'bg-lecatex/10 border border-lecatex/30'
                          : 'bg-muted hover:bg-accent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full border-2 ${
                          selectedShipping?.id === opt.id ? 'border-lecatex bg-lecatex' : 'border-muted-foreground'
                        }`} />
                        <span className="font-medium">{opt.name}</span>
                        <span className="text-muted-foreground">({opt.estimatedDays})</span>
                      </div>
                      <span className={`font-semibold ${opt.isFree ? 'text-green-600' : ''}`}>
                        {opt.isFree ? 'GRATIS' : formatPrice(opt.cost)}
                      </span>
                    </button>
                  ))}
                  {freeThreshold && subtotal < freeThreshold && (
                    <p className="text-[11px] text-muted-foreground text-center mt-1">
                      Envío gratis desde {formatPrice(freeThreshold)} (faltan {formatPrice(freeThreshold - subtotal)})
                    </p>
                  )}
                </div>
              )}

              {calculating && (
                <p className="text-xs text-muted-foreground animate-pulse">Calculando envío...</p>
              )}

              <Separator />

              {/* Totals */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Envío</span>
                  <span>{shippingCost > 0 ? formatPrice(shippingCost) : province ? 'Gratis' : '--'}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-lecatex">{formatPrice(total)}</span>
                </div>
              </div>

              <Button
                className="w-full bg-lecatex hover:bg-lecatex-dark text-white font-semibold h-11"
                onClick={() => {
                  closeCart();
                  onCheckout();
                }}
                disabled={items.length === 0}
              >
                Finalizar Compra
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
