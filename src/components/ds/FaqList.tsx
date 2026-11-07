import { Plus } from 'lucide-react';

export interface FaqEntry {
  question: string;
  answer: string;
}

/** FAQ en liste à séparateurs, sans JavaScript (details/summary). */
export function FaqList({ items }: { items: FaqEntry[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-[17px] font-medium text-ink [&::-webkit-details-marker]:hidden">
            {item.question}
            <Plus aria-hidden className="h-5 w-5 shrink-0 text-ink-3 transition-transform duration-200 group-open:rotate-45" strokeWidth={1.5} />
          </summary>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-2">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
