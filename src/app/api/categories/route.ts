import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const categories = await db.category.findMany({
      orderBy: { order: 'asc' },
    });

    // Count products by categorySlug since products use that field
    const productCounts = await db.product.groupBy({
      by: ['categorySlug'],
      _count: { categorySlug: true },
    });

    const countMap = new Map(
      productCounts.map((p) => [p.categorySlug, p._count.categorySlug])
    );

    const formattedCategories = categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      image: c.image,
      order: c.order,
      productCount: countMap.get(c.slug) || 0,
    }));

    return NextResponse.json(formattedCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Error al obtener categorías' },
      { status: 500 }
    );
  }
}
