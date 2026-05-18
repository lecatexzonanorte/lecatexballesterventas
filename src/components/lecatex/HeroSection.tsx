'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Truck, Shield, Clock } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (view: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-warm-gray-light">
      {/* Hero */}
      <div className="relative min-h-[500px] sm:min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt="Revestimientos Lecatex"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-lecatex text-white mb-4 sm:mb-6">
              CALIDAD ARGENTINA
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
              Revestimientos
              <span className="text-lecatex"> Lecatex</span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white/90">
                Calidad que se ve
              </span>
            </h1>
            <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8 max-w-lg leading-relaxed">
              Más de 20 años acompañando a profesionales del sector construcción con 
              revestimientos plásticos, texturados y al agua de primera calidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-lecatex hover:bg-lecatex-dark text-white font-semibold text-base px-8 h-12"
                onClick={() => onNavigate('products')}
              >
                Ver Productos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 h-12 text-base"
                onClick={() => onNavigate('categories')}
              >
                Explorar Categorías
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits bar */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
            <div className="flex items-center gap-3 py-4 px-2 sm:px-4 sm:justify-center">
              <div className="h-10 w-10 rounded-full bg-lecatex/10 flex items-center justify-center shrink-0">
                <Truck className="h-5 w-5 text-lecatex" />
              </div>
              <div>
                <p className="text-sm font-semibold">Envío a todo el país</p>
                <p className="text-xs text-muted-foreground">Gratis en compras +$50.000</p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-4 px-2 sm:px-4 sm:justify-center">
              <div className="h-10 w-10 rounded-full bg-lecatex/10 flex items-center justify-center shrink-0">
                <Shield className="h-5 w-5 text-lecatex" />
              </div>
              <div>
                <p className="text-sm font-semibold">Garantía de calidad</p>
                <p className="text-xs text-muted-foreground">Productos certificados</p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-4 px-2 sm:px-4 sm:justify-center">
              <div className="h-10 w-10 rounded-full bg-lecatex/10 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-lecatex" />
              </div>
              <div>
                <p className="text-sm font-semibold">Asesoramiento profesional</p>
                <p className="text-xs text-muted-foreground">Lun-Vie 8:00-18:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
