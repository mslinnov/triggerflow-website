import Image from 'next/image';
import type { ArticleImage } from '@/types/blog';

interface ImageBlockProps {
  id: string;
  images: ArticleImage[];
  slug: string;
}

export function ImageBlock({ id, images, slug }: ImageBlockProps) {
  // L'image « hero » est déjà affichée en tête par la page article : ne pas la répéter dans le corps.
  if (id === 'hero') return null;
  const image = images.find((img) => img.id === id);
  if (!image) return null;

  const src = `/images/blog/${slug}/${image.filename}`;

  return (
    <figure className="not-prose my-10">
      <div className="overflow-hidden rounded-xl border border-line bg-paper">
        <Image src={src} alt={image.alt} width={image.width} height={image.height} className="h-auto w-full" />
      </div>
      {image.alt && <figcaption className="mt-3 text-center text-[13px] leading-snug text-ink-3">{image.alt}</figcaption>}
    </figure>
  );
}
