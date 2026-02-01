'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TOCItem } from '@/types/blog';

interface TableOfContentsProps {
  items: TOCItem[];
  title: string;
  showLabel: string;
  hideLabel: string;
}

export function TableOfContents({ items, title, showLabel, hideLabel }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const activeRef = useRef<HTMLAnchorElement>(null);

  // Filter to only H2 items
  const h2Items = items.filter((item) => item.level === 2);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveId(id);
      setIsOpen(false);
    }
  }, []);

  // Scroll spy: track which heading is currently in view
  useEffect(() => {
    if (h2Items.length === 0) return;

    const headingEls: HTMLElement[] = [];
    for (const item of h2Items) {
      const el = document.getElementById(item.id);
      if (el) headingEls.push(el);
    }

    if (headingEls.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY + 150;

      // Find the last heading that is above the current scroll position
      let current = '';
      for (const el of headingEls) {
        if (el.offsetTop <= scrollY) {
          current = el.id;
        }
      }

      if (current) {
        setActiveId(current);
      }
    };

    // Run once on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [h2Items]);

  if (h2Items.length < 2) return null;

  return (
    <>
      {/* Mobile: collapsible */}
      <div className="mb-10 border-y border-gray-200 lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between py-4 text-sm font-medium text-brand-dark"
        >
          <span>{title}</span>
          <ChevronDown
            className={cn(
              'h-4 w-4 text-gray-400 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </button>
        {isOpen && (
          <nav className="border-t border-gray-100 pb-4">
            <ul className="pt-2">
              {h2Items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className={cn(
                      'block py-1.5 text-[13px] leading-snug transition-colors',
                      activeId === item.id
                        ? 'text-brand-primary font-medium'
                        : 'text-gray-500 hover:text-brand-dark'
                    )}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop: sticky sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
            {title}
          </p>
          <nav>
            <ul className="border-l border-gray-200">
              {h2Items.map((item) => (
                <li key={item.id}>
                  <a
                    ref={activeId === item.id ? activeRef : undefined}
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className={cn(
                      'block border-l-2 -ml-px py-1.5 pl-4 text-[12.5px] leading-snug transition-colors duration-150',
                      activeId === item.id
                        ? 'border-brand-primary text-brand-primary font-medium'
                        : 'border-transparent text-gray-400 hover:text-brand-dark hover:border-gray-300'
                    )}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
