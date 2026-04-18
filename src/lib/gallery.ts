import fs from "fs";
import path from "path";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export function getGalleryImages(): GalleryImage[] {
  const galleryDir = path.join(process.cwd(), "public", "gallery");
  
  // If the directory doesn't exist, return empty array
  if (!fs.existsSync(galleryDir)) {
    return [];
  }

  // Read all files in the directory
  const files = fs.readdirSync(galleryDir);
  
  // Filter for image files and sort them alphabetically
  const imageFiles = files
    .filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
    .sort();

  return imageFiles.map((file, index) => ({
    id: `gallery-img-${index}`,
    src: `/gallery/${file}`,
    // Create a readable alt text from the filename (e.g., "my-photo.jpg" -> "My Photo")
    alt: file
      .replace(/\.[^/.]+$/, "") // Remove extension
      .replace(/[-_]/g, " ")    // Replace dashes and underscores with spaces
      .replace(/\b\w/g, (c) => c.toUpperCase()), // Capitalize first letters
  }));
}
