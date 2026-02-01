import Image from 'next/image';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container, SectionWrapper } from '@/components/ui';

export interface LPTestimonialProps {
  quote: string;
  authorName: string;
  authorRole: string;
  authorImage?: string;
  rating?: number;
  companyLogo?: string;
  className?: string;
}

export function LPTestimonial({
  quote,
  authorName,
  authorRole,
  authorImage,
  rating,
  companyLogo,
  className,
}: LPTestimonialProps) {
  return (
    <SectionWrapper background="white" className={className}>
      <Container>
        <div className="mx-auto max-w-3xl rounded-2xl border-l-4 border-brand-primary bg-brand-light/40 p-8 md:p-12">
          {/* Decorative quote mark */}
          <span
            className="block text-5xl leading-none text-brand-primary/20"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          {/* Rating */}
          {rating && rating > 0 && (
            <div className="-mt-4 mb-4 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-5 w-5',
                    i < rating
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-zinc-200 text-zinc-200'
                  )}
                />
              ))}
            </div>
          )}

          {/* Quote */}
          <blockquote className="text-lg leading-relaxed text-brand-dark md:text-xl">
            {quote}
          </blockquote>

          {/* Author */}
          <div className="mt-6 flex items-center gap-4">
            {authorImage && (
              <Image
                src={authorImage}
                alt={authorName}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-semibold text-brand-dark">{authorName}</p>
              <p className="text-sm text-zinc-500">{authorRole}</p>
            </div>
            {companyLogo && (
              <Image
                src={companyLogo}
                alt=""
                width={80}
                height={24}
                className="ml-auto h-6 w-auto opacity-50"
              />
            )}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
