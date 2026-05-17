'use client';

import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-foreground text-background mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-lecatex mb-3">Lecatex</h3>
            <p className="text-sm text-background/70 leading-relaxed">
              Revestimientos de calidad argentina desde hace más de 20 años. 
              Productos profesionales para profesionales.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://instagram.com/lecatex"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-lecatex/80 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com/lecatex"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-lecatex/80 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 text-lecatex-light">Navegación</h4>
            <ul className="space-y-2">
              {[
                { label: 'Inicio', view: 'home' },
                { label: 'Productos', view: 'products' },
                { label: 'Categorías', view: 'categories' },
              ].map((link) => (
                <li key={link.view}>
                  <button
                    onClick={() => onNavigate(link.view)}
                    className="text-sm text-background/70 hover:text-lecatex-light transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 text-lecatex-light">Categorías</h4>
            <ul className="space-y-2">
              {[
                'Revestimientos Plásticos',
                'Revestimientos Texturados',
                'Revestimientos al Agua',
                'Enduidos y Preparación',
                'Pinturas',
                'Accesorios',
              ].map((cat) => (
                <li key={cat}>
                  <span className="text-sm text-background/70">{cat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 text-lecatex-light">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-lecatex" />
                <span className="text-sm text-background/70">Av. Industrial 1234, CABA, Argentina</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-lecatex" />
                <span className="text-sm text-background/70">(011) 4567-8900</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-lecatex" />
                <span className="text-sm text-background/70">info@lecatex.com.ar</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-lecatex" />
                <span className="text-sm text-background/70">Lun-Vie 8:00-18:00</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-background/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-background/50">
          <p>&copy; {new Date().getFullYear()} Lecatex. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <span>Términos y Condiciones</span>
            <span>Política de Privacidad</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
