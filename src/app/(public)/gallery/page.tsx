import Image from "next/image";
import { galleryImages } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
          Moments in Motion
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          A glimpse into our community, our runs, and our shared passion.
        </p>
      </div>

      <div className="mt-12 columns-2 gap-4 sm:columns-3 xl:columns-4">
        {galleryImages.map((image) => (
          <div key={image.id} className="relative mb-4 break-inside-avoid">
             <Card className="overflow-hidden">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  data-ai-hint={image.imageHint}
                  width={600}
                  height={600}
                  className="h-auto w-full transform rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
