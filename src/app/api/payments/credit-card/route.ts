import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, cardNumber, cardExpiry, cardCvv, cardName, total } = body;

    if (!orderId || !cardNumber || !cardExpiry || !cardCvv || !cardName) {
      return NextResponse.json(
        { error: 'Faltan datos de la tarjeta' },
        { status: 400 }
      );
    }

    // Mock credit card payment processing
    // In production, integrate with a real payment gateway (MercadoPago, Stripe, etc.)
    const lastFour = cardNumber.replace(/\s/g, '').slice(-4);

    // Simulate payment processing delay would happen here
    const paymentSuccess = true; // Mock: always succeed

    if (paymentSuccess) {
      return NextResponse.json({
        success: true,
        paymentId: `pay-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
        status: 'approved',
        message: 'Pago procesado exitosamente',
        cardLastFour: lastFour,
        amount: total,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          status: 'rejected',
          message: 'El pago fue rechazado. Intente con otro medio de pago.',
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error processing credit card payment:', error);
    return NextResponse.json(
      { error: 'Error al procesar el pago' },
      { status: 500 }
    );
  }
}
