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
      <div className="mb-10 rounded-xl border border-line bg-paper px-5 lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between py-4 font-mono text-[12px] font-medium uppercase tracking-[0.06em] text-ink"
        >
          <span>{title}</span>
          <ChevronDown
            className={cn(
              'h-4 w-4 text-ink-3 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </button>
        {isOpen && (
          <nav className="border-t border-line pb-4">
            <ul className="pt-2">
              {h2Items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className={cn(
                      'block py-1.5 text-[14px] leading-snug transition-colors',
                      activeId === item.id
                        ? 'font-medium text-accent'
                        : 'text-ink-2 hover:text-ink'
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
          <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-ink-3">
            {title}
          </p>
          <nav>
            <ul className="border-l border-line">
              {h2Items.map((item) => (
                <li key={item.id}>
                  <a
                    ref={activeId === item.id ? activeRef : undefined}
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className={cn(
                      'block border-l-2 -ml-px py-1.5 pl-4 text-[13px] leading-snug transition-colors duration-150',
                      activeId === item.id
                        ? 'border-accent font-medium text-accent'
                        : 'border-transparent text-ink-3 hover:border-ink-3 hover:text-ink'
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
