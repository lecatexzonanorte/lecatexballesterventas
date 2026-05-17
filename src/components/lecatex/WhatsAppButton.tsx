'use client';

import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WhatsAppButton() {
  const phoneNumber = '5491112345678';
  const message = encodeURIComponent('Hola! Me interesa conocer más sobre los productos Lecatex.');

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Contactar por WhatsApp"
    >
      <Button
        size="icon"
        className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] shadow-lg hover:shadow-xl transition-all group-hover:scale-110"
      >
        <MessageCircle className="h-7 w-7 text-white" />
      </Button>
      <span className="absolute bottom-full right-0 mb-2 px-3 py-1.5 text-xs font-medium text-white bg-foreground rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        ¡Chateá con nosotros!
      </span>
    </a>
  );
}
