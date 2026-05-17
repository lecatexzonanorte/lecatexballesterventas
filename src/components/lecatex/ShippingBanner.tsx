'use client';

import { Truck, Gift, CreditCard, HeadphonesIcon } from 'lucide-react';

export default function ShippingBanner() {
  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex flex-col items-center text-center p-4 sm:p-6 rounded-xl bg-lecatex/5 border border-lecatex/10">
            <div className="h-12 w-12 rounded-full bg-lecatex/10 flex items-center justify-center mb-3">
              <Truck className="h-6 w-6 text-lecatex" />
            </div>
            <h3 className="text-sm font-semibold mb-1">Envío Gratis</h3>
            <p className="text-xs text-muted-foreground">En compras mayores a $50.000 en CABA</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 sm:p-6 rounded-xl bg-terracotta/5 border border-terracotta/10">
            <div className="h-12 w-12 rounded-full bg-terracotta/10 flex items-center justify-center mb-3">
              <Gift className="h-6 w-6 text-terracotta" />
            </div>
            <h3 className="text-sm font-semibold mb-1">Promociones</h3>
            <p className="text-xs text-muted-foreground">Descuentos especiales por cantidad</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 sm:p-6 rounded-xl bg-amber-warm/5 border border-amber-warm/10">
            <div className="h-12 w-12 rounded-full bg-amber-warm/10 flex items-center justify-center mb-3">
              <CreditCard className="h-6 w-6 text-amber-warm" />
            </div>
            <h3 className="text-sm font-semibold mb-1">MercadoPago</h3>
            <p className="text-xs text-muted-foreground">Pagá con tarjeta, transferencia o efectivo</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 sm:p-6 rounded-xl bg-warm-gray/5 border border-warm-gray/10">
            <div className="h-12 w-12 rounded-full bg-warm-gray/10 flex items-center justify-center mb-3">
              <HeadphonesIcon className="h-6 w-6 text-warm-gray" />
            </div>
            <h3 className="text-sm font-semibold mb-1">Asesoramiento</h3>
            <p className="text-xs text-muted-foreground">Consultanos por WhatsApp o teléfono</p>
          </div>
        </div>
      </div>
    </section>
  );
}
