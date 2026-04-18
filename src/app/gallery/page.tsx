import PhotoCarousel from "@/components/PhotoCarousel";
import { getGalleryImages } from "@/lib/gallery";

export default function GalleryPage() {
  const photos = getGalleryImages();

  return <PhotoCarousel photos={photos} />;
}
