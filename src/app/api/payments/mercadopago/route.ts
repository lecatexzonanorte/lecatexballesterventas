import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, orderNumber, total, customerEmail, items } = body;

    if (!orderNumber || !total) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos para crear la preferencia' },
        { status: 400 }
      );
    }

    // Mock MercadoPago preference creation
    // In production, use the MP SDK with your access token from env vars
    const preferenceId = `mock-mp-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    // Mock init_point URL (in production this comes from MP API)
    const initPoint = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preferenceId}`;

    return NextResponse.json({
      success: true,
      preferenceId,
      initPoint,
      sandboxInitPoint: initPoint,
      orderId,
      orderNumber,
      total,
      message: 'Preferencia de MercadoPago creada (modo sandbox)',
    });
  } catch (error) {
    console.error('Error creating MP preference:', error);
    return NextResponse.json(
      { error: 'Error al crear preferencia de MercadoPago' },
      { status: 500 }
    );
  }
}
