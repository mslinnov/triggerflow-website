import Image from 'next/image';
import type { ArticleImage } from '@/types/blog';

interface ImageBlockProps {
  id: string;
  images: ArticleImage[];
  slug: string;
}

export function ImageBlock({ id, images, slug }: ImageBlockProps) {
  const image = images.find((img) => img.id === id);
  if (!image) return null;

  const src = `/images/blog/${slug}/${image.filename}`;

  return (
    <figure className="my-10">
      <div className="overflow-hidden rounded-sm">
        <Image
          src={src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="w-full"
          priority={id === 'hero'}
        />
      </div>
      {image.alt && (
        <figcaption className="mt-3 text-center text-sm italic text-gray-400">
          {image.alt}
        </figcaption>
      )}
    </figure>
  );
}
