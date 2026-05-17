import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { province, subtotal } = body;

    if (!province || subtotal === undefined) {
      return NextResponse.json(
        { error: 'Provincia y subtotal son requeridos' },
        { status: 400 }
      );
    }

    // Get all active shipping rules
    const allRules = await db.shippingRule.findMany({
      where: { active: true },
    });

    // Filter rules that apply: either province-specific or general (null province = Interior)
    const applicableRules = allRules.filter((rule) => {
      if (rule.province === province) return true;
      if (rule.province === null && !allRules.some((r) => r.province === province && r.type === rule.type)) return true;
      return false;
    });

    const shippingOptions = applicableRules.map((rule) => {
      const isFree = rule.freeAbove && subtotal >= rule.freeAbove;
      return {
        id: rule.id,
        name: rule.name,
        type: rule.type,
        cost: isFree ? 0 : rule.cost,
        originalCost: rule.cost,
        freeAbove: rule.freeAbove,
        estimatedDays: rule.type === 'express' ? '1-2 días hábiles' : '3-5 días hábiles',
        isFree: !!isFree,
      };
    });

    // Add pickup option
    shippingOptions.push({
      id: 'pickup',
      name: 'Retiro en depósito',
      type: 'pickup',
      cost: 0,
      originalCost: 0,
      freeAbove: null,
      estimatedDays: 'Disponible en 24hs',
      isFree: true,
    });

    return NextResponse.json({
      province,
      subtotal,
      options: shippingOptions,
      freeShippingThreshold: applicableRules.reduce((min, rule) => {
        if (rule.freeAbove && (!min || rule.freeAbove < min)) return rule.freeAbove;
        return min;
      }, 0 as number | null),
    });
  } catch (error) {
    console.error('Error calculating shipping:', error);
    return NextResponse.json(
      { error: 'Error al calcular envío' },
      { status: 500 }
    );
  }
}
