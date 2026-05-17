import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `LCX-${timestamp}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      address,
      city,
      province,
      postalCode,
      shippingMethod,
      paymentMethod,
      items,
      subtotal,
      shippingCost,
      total,
    } = body;

    if (!customerName || !customerEmail || !customerPhone || !items?.length) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    const orderNumber = generateOrderNumber();

    const order = await db.order.create({
      data: {
        orderNumber,
        customerName,
        customerEmail,
        customerPhone,
        address: address || '',
        city: city || '',
        province: province || '',
        postalCode: postalCode || '',
        shippingMethod: shippingMethod || 'standard',
        paymentMethod: paymentMethod || 'mercadopago',
        subtotal: subtotal || 0,
        shippingCost: shippingCost || 0,
        total: total || 0,
        paymentStatus: 'pending',
        status: 'pending',
        items: {
          create: items.map((item: { productId: string; name: string; price: number; quantity: number; color?: string; size?: string }) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            color: item.color || null,
            size: item.size || null,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        subtotal: order.subtotal,
        shippingCost: order.shippingCost,
        total: order.total,
        status: order.status,
        paymentMethod: order.paymentMethod,
        items: order.items,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Error al crear el pedido' },
      { status: 500 }
    );
  }
}
