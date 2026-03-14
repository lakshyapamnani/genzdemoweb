import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const filePath = path.join(process.cwd(), 'src/data/products.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const products = JSON.parse(fileData);

    const newProduct = {
      id: data.id || `product-${Date.now()}`,
      name: data.name,
      price: Number(data.price),
      description: data.description,
      image: data.image || '/frames/ezgif-frame-001.jpg',
      badge: data.badge || null,
    };

    products.push(newProduct);
    
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ success: false, error: 'Failed to add product' }, { status: 500 });
  }
}
