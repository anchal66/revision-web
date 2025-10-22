import { codeToHtml } from 'shiki';
import { transformerNotationHighlight } from '@shikijs/transformers';
import { CopyButton } from './CopyButton';

interface CodeBlockProps {
  code: string;
  lang: string;
  filename?: string;
}

export async function CodeBlock({ code, lang, filename }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: lang,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    transformers: [
      transformerNotationHighlight(),
    ],
  });

  return (
    <div className="code-block-container my-6 rounded-lg border bg-secondary/50 relative">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <p className="text-sm text-muted-foreground">{filename}</p>
        </div>
      )}
      <div className="absolute top-2 right-2">
        <CopyButton textToCopy={code} />
      </div>
      <div
        className="text-sm overflow-x-auto p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}