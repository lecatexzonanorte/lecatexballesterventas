'use client';

import { useState } from 'react';
import { CreditCard, Truck, ClipboardCheck, ArrowLeft, ArrowRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCartStore } from '@/store/cart';
import { formatPrice } from './ProductCard';

interface CheckoutViewProps {
  onBack: () => void;
  onSuccess: (orderData: { orderNumber: string; total: number; items: { name: string; quantity: number; price: number }[] }) => void;
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

export default function CheckoutView({ onBack, onSuccess }: CheckoutViewProps) {
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);

  // Step 1: Shipping data
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShippingId, setSelectedShippingId] = useState('');
  const [shippingCalculated, setShippingCalculated] = useState(false);

  // Step 2: Payment
  const [paymentMethod, setPaymentMethod] = useState<'mercadopago' | 'credit_card'>('mercadopago');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const { items, getSubtotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();
  const selectedShipping = shippingOptions.find((o) => o.id === selectedShippingId);
  const shippingCost = selectedShipping?.cost || 0;
  const total = subtotal + shippingCost;

  const calculateShipping = async () => {
    if (!province) return;
    try {
      const res = await fetch('/api/shipping/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ province, subtotal }),
      });
      const data = await res.json();
      setShippingOptions(data.options || []);
      if (data.options?.length > 0) {
        setSelectedShippingId(data.options[0].id);
      }
      setShippingCalculated(true);
    } catch (e) {
      console.error(e);
    }
  };

  const validateStep1 = () => {
    return customerName && customerEmail && customerPhone && address && city && province && postalCode && selectedShippingId;
  };

  const validateStep2 = () => {
    if (paymentMethod === 'credit_card') {
      return cardNumber && cardExpiry && cardCvv && cardName;
    }
    return true;
  };

  const handleConfirmOrder = async () => {
    setProcessing(true);
    try {
      // Create order
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          address,
          city,
          province,
          postalCode,
          shippingMethod: selectedShipping?.type || 'standard',
          paymentMethod,
          items: items.map((i) => ({
            productId: i.product.id,
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
            color: i.selectedColor,
            size: i.selectedSize,
          })),
          subtotal,
          shippingCost,
          total,
        }),
      });
      const orderData = await orderRes.json();

      if (!orderData.success) {
        throw new Error(orderData.error);
      }

      // Process payment
      if (paymentMethod === 'credit_card') {
        const payRes = await fetch('/api/payments/credit-card', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: orderData.order.id,
            cardNumber,
            cardExpiry,
            cardCvv,
            cardName,
            total,
          }),
        });
        const payData = await payRes.json();
        if (!payData.success) {
          throw new Error(payData.message || 'Error en el pago');
        }
      } else {
        // Create MP preference
        await fetch('/api/payments/mercadopago', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: orderData.order.id,
            orderNumber: orderData.order.orderNumber,
            total,
            customerEmail,
            items: items.map((i) => ({
              name: i.product.name,
              quantity: i.quantity,
              price: i.product.price,
            })),
          }),
        });
      }

      clearCart();
      onSuccess({
        orderNumber: orderData.order.orderNumber,
        total,
        items: items.map((i) => ({
          name: i.product.name,
          quantity: i.quantity,
          price: i.product.price,
        })),
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al procesar el pedido. Por favor, intentá de nuevo.');
    } finally {
      setProcessing(false);
    }
  };

  const steps = [
    { num: 1, label: 'Envío', icon: Truck },
    { num: 2, label: 'Pago', icon: CreditCard },
    { num: 3, label: 'Resumen', icon: ClipboardCheck },
  ];

  return (
    <section className="py-8 sm:py-12 min-h-[60vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>

        {/* Step indicator */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    step >= s.num
                      ? 'bg-lecatex text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step > s.num ? '✓' : <s.icon className="h-4 w-4" />}
                </div>
                <span className={`text-xs mt-1 ${step >= s.num ? 'text-lecatex font-medium' : 'text-muted-foreground'}`}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 ${step > s.num ? 'bg-lecatex' : 'bg-muted'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Shipping */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Datos de Envío</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input id="name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Tu nombre" />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} placeholder="tu@email.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input id="phone" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="(011) 1234-5678" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Dirección *</Label>
                  <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Calle y número" />
                </div>
                <div>
                  <Label htmlFor="city">Ciudad *</Label>
                  <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ciudad" />
                </div>
                <div>
                  <Label htmlFor="province">Provincia *</Label>
                  <select
                    id="province"
                    value={province}
                    onChange={(e) => { setProvince(e.target.value); setShippingCalculated(false); }}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                  >
                    <option value="">Seleccionar provincia</option>
                    {provinces.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="postal">Código Postal *</Label>
                  <Input id="postal" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="C1000" />
                </div>
              </div>

              {/* Shipping options */}
              {!shippingCalculated && province && (
                <Button
                  variant="outline"
                  className="w-full border-lecatex text-lecatex"
                  onClick={calculateShipping}
                >
                  <Truck className="mr-2 h-4 w-4" />
                  Calcular opciones de envío
                </Button>
              )}

              {shippingCalculated && shippingOptions.length > 0 && (
                <div>
                  <Label className="mb-2 block">Método de envío *</Label>
                  <RadioGroup value={selectedShippingId} onValueChange={setSelectedShippingId}>
                    {shippingOptions.map((opt) => (
                      <div
                        key={opt.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-lecatex/30 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value={opt.id} id={opt.id} />
                          <Label htmlFor={opt.id} className="cursor-pointer">
                            <span className="font-medium text-sm">{opt.name}</span>
                            <span className="text-xs text-muted-foreground ml-1">({opt.estimatedDays})</span>
                          </Label>
                        </div>
                        <span className={`text-sm font-semibold ${opt.isFree ? 'text-green-600' : ''}`}>
                          {opt.isFree ? 'GRATIS' : formatPrice(opt.cost)}
                        </span>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <Button
                  className="bg-lecatex hover:bg-lecatex-dark text-white"
                  disabled={!validateStep1()}
                  onClick={() => setStep(2)}
                >
                  Continuar
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Método de Pago</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as typeof paymentMethod)}>
                <div className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-lecatex/30 cursor-pointer">
                  <RadioGroupItem value="mercadopago" id="mercadopago" />
                  <Label htmlFor="mercadopago" className="cursor-pointer flex-1">
                    <span className="font-medium">MercadoPago</span>
                    <p className="text-xs text-muted-foreground">Tarjeta, transferencia o efectivo</p>
                  </Label>
                  <div className="h-8 px-3 bg-[#009EE3] rounded text-white text-xs font-bold flex items-center">
                    MP
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-lecatex/30 cursor-pointer">
                  <RadioGroupItem value="credit_card" id="credit_card" />
                  <Label htmlFor="credit_card" className="cursor-pointer flex-1">
                    <span className="font-medium">Tarjeta de Crédito/Débito</span>
                    <p className="text-xs text-muted-foreground">Visa, Mastercard, Amex</p>
                  </Label>
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                </div>
              </RadioGroup>

              {paymentMethod === 'credit_card' && (
                <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <Label htmlFor="cardName">Nombre en la tarjeta</Label>
                    <Input id="cardName" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="JUAN PEREZ" />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Número de tarjeta</Label>
                    <Input id="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="4500 0000 0000 0000" maxLength={19} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="cardExpiry">Vencimiento</Label>
                      <Input id="cardExpiry" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} placeholder="MM/AA" maxLength={5} />
                    </div>
                    <div>
                      <Label htmlFor="cardCvv">CVV</Label>
                      <Input id="cardCvv" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} placeholder="123" maxLength={4} type="password" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    Tus datos están protegidos con encriptación SSL
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-2">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Volver
                </Button>
                <Button
                  className="bg-lecatex hover:bg-lecatex-dark text-white"
                  disabled={!validateStep2()}
                  onClick={() => setStep(3)}
                >
                  Continuar
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Summary */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Customer info */}
              <div className="p-3 bg-muted/50 rounded-lg text-sm">
                <p className="font-medium mb-1">Datos de envío</p>
                <p className="text-muted-foreground">{customerName}</p>
                <p className="text-muted-foreground">{address}, {city}, {province} ({postalCode})</p>
                <p className="text-muted-foreground">{customerEmail} · {customerPhone}</p>
                <p className="text-muted-foreground mt-1">
                  Envío: {selectedShipping?.name} ({selectedShipping?.estimatedDays})
                </p>
              </div>

              {/* Payment info */}
              <div className="p-3 bg-muted/50 rounded-lg text-sm">
                <p className="font-medium mb-1">Método de pago</p>
                <p className="text-muted-foreground">
                  {paymentMethod === 'mercadopago' ? 'MercadoPago' : `Tarjeta terminada en ${cardNumber.slice(-4) || '****'}`}
                </p>
              </div>

              {/* Items */}
              <div>
                <p className="font-medium text-sm mb-2">Productos ({items.length})</p>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.product.name} x{item.quantity}
                      </span>
                      <span>{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Envío</span>
                  <span>{shippingCost > 0 ? formatPrice(shippingCost) : 'Gratis'}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-lecatex">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <Button variant="outline" onClick={() => setStep(2)}>
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Volver
                </Button>
                <Button
                  className="bg-lecatex hover:bg-lecatex-dark text-white font-semibold"
                  onClick={handleConfirmOrder}
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Confirmar Pedido
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
