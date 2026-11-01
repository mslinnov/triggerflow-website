import type { TempsFortCode } from '@/data/calendrier-marketing';
import { ThemedPreview, type ThemeVariant } from './ThemedPreview';
import { useThemedTemplateLabels } from './useThemedTemplateLabels';

interface ThemedTemplateBlockProps {
  code: TempsFortCode;
  title: string;
  variants: ThemeVariant[];
  variables: Record<string, string>;
  mode?: 'template' | 'example';
  withCopy?: boolean;
}

/** ThemedPreview avec ses libellés, pour les pages serveur asynchrones (sans hook). */
export function ThemedTemplateBlock(props: ThemedTemplateBlockProps) {
  const labels = useThemedTemplateLabels();
  return <ThemedPreview {...props} labels={labels} />;
}
