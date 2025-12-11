
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const galleryDir = path.join(process.cwd(), 'public', 'images', 'gallery');

  try {
    // Check if directory exists
    if (!fs.existsSync(galleryDir)) {
      return NextResponse.json({ images: [] });
    }

    const files = fs.readdirSync(galleryDir);

    // Filter for image files
    const images = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
    });

    const imageUrls = images.map(file => `/images/gallery/${file}`);

    return NextResponse.json({ images: imageUrls });
  } catch (error) {
    console.error('Error reading gallery directory:', error);
    return NextResponse.json({ error: 'Failed to image list' }, { status: 500 });
  }
}
