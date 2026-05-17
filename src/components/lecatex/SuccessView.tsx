'use client';

import { CheckCircle, Package, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from './ProductCard';

interface SuccessViewProps {
  orderNumber: string;
  total: number;
  items: { name: string; quantity: number; price: number }[];
  onBackHome: () => void;
}

export default function SuccessView({ orderNumber, total, items, onBackHome }: SuccessViewProps) {
  return (
    <section className="py-12 sm:py-20 min-h-[60vh]">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-2">¡Pedido Confirmado!</h1>
        <p className="text-muted-foreground mb-8">
          Tu pedido ha sido procesado exitosamente. Recibirás un email con los detalles.
        </p>

        <Card className="text-left mb-8">
          <CardContent className="p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-lecatex" />
                <span className="font-medium">Pedido</span>
              </div>
              <span className="font-mono text-sm bg-muted px-3 py-1 rounded-md">
                {orderNumber}
              </span>
            </div>

            <Separator />

            <div>
              <p className="text-sm font-medium mb-2">Productos</p>
              <div className="space-y-2">
                {items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x{item.quantity}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-lecatex">{formatPrice(total)}</span>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button
            className="bg-lecatex hover:bg-lecatex-dark text-white font-semibold w-full sm:w-auto px-8"
            onClick={onBackHome}
          >
            Volver al inicio
          </Button>
          <p className="text-xs text-muted-foreground">
            Podés seguir tu pedido con el número <strong>{orderNumber}</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
