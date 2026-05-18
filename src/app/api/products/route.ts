import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categorySlug = searchParams.get('category');
    const featured = searchParams.get('featured');

    const where: Record<string, unknown> = {};

    if (categorySlug) {
      where.categorySlug = categorySlug;
    }

    if (featured === 'true') {
      where.featured = true;
    }

    const products = await db.product.findMany({
      where,
      include: { categoryRel: true },
      orderBy: { name: 'asc' },
    });

    const formattedProducts = products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price,
      comparePrice: p.comparePrice,
      unit: p.unit,
      weight: p.weight,
      image: p.image,
      images: JSON.parse(p.images) as string[],
      category: p.category,
      categorySlug: p.categorySlug,
      featured: p.featured,
      inStock: p.inStock,
      stockQty: p.stockQty,
      colors: JSON.parse(p.colors) as string[],
      sizes: JSON.parse(p.sizes) as string[],
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    );
  }
}
