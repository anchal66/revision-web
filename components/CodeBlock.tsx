// @/components/CodeBlock.tsx (Final Dynamic Theme Update)
'use client';

import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import { codeToHtml } from 'shiki';
import { transformerNotationHighlight } from '@shikijs/transformers';
import { CopyButton } from './CopyButton';

interface CodeBlockProps {
  code: string;
  lang: string;
  filename?: string;
}

// 🎯 Define themes outside the function to avoid re-creation
const SHIKI_THEMES = {
  light: 'github-light',
  dark: 'github-dark',
};

export function CodeBlock({ code, lang, filename }: CodeBlockProps) {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null); // Ref to check parent theme

  // Function to detect if the component is rendered inside a dark-mode parent
  const getCurrentTheme = () => {
    // Check if the current container (or any parent) has the 'dark' class
    let element: HTMLElement | null = containerRef.current;
    while (element) {
      if (element.classList.contains('dark')) {
        return SHIKI_THEMES.dark;
      }
      element = element.parentElement;
    }
    return SHIKI_THEMES.light;
  };

  useEffect(() => {
    let isMounted = true;

    async function highlightCode() {
      // 1. Determine the active theme dynamically
      const activeTheme = getCurrentTheme();
      setHtmlContent(null); // Reset content while loading new theme

      try {
        const html = await codeToHtml(code, {
          lang: lang,
          // 2. Pass ONLY the active theme name as a string
          theme: activeTheme,
          transformers: [
            transformerNotationHighlight(),
          ],
        });

        if (isMounted) {
          setHtmlContent(html);
        }
      } catch (error) {
        console.error("Error highlighting code:", error);
        if (isMounted) {
          setHtmlContent(`<pre><code>${code}</code></pre>`);
        }
      }
    }

    highlightCode();

    // 3. Set up a MutationObserver to watch for theme changes (e.g., toggling the 'dark' class on the HTML or body)
    // This is necessary if the theme can change *after* the initial render.
    const observer = new MutationObserver(highlightCode);

    // Watch for class changes on the root element (where 'dark' class is usually toggled)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      isMounted = false;
      observer.disconnect(); // Clean up observer
    };
  }, [code, lang]); // Dependencies: code and language (theme check runs in observer)

  // 4. Render the component with the ref
  return (
    <div
      ref={containerRef} // Attach the ref here
      className="code-block-container my-6 rounded-lg border bg-secondary/50 relative"
    >
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <p className="text-sm text-muted-foreground">{filename}</p>
        </div>
      )}
      <div className="relative group">
        <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <CopyButton textToCopy={code} />
        </div>
        <div className="max-h-[600px] overflow-y-auto overflow-x-auto rounded-lg border bg-muted/50">
          {htmlContent === null ? (
            <div className="p-4 text-sm text-muted-foreground">Loading code syntax...</div>
          ) : (
            <pre className="p-4 text-sm font-mono leading-relaxed min-w-full w-max">
              <code dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}