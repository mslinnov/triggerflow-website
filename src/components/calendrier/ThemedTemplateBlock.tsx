import { ThemedMjmlTemplate, type ThemeVariant } from './ThemedMjmlTemplate';
import { useThemedTemplateLabels } from './useThemedTemplateLabels';

interface ThemedTemplateBlockProps {
  code: string;
  variants: ThemeVariant[];
  variables: Record<string, string>;
  mode?: 'template' | 'example';
  withCopy?: boolean;
}

/** ThemedMjmlTemplate avec ses libellés, pour les pages serveur asynchrones (sans hook). */
export function ThemedTemplateBlock(props: ThemedTemplateBlockProps) {
  const labels = useThemedTemplateLabels();
  return <ThemedMjmlTemplate {...props} labels={labels} />;
}
