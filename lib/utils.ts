import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function renderSimpleMarkdown(text: string): string {
  if (!text) return "";

  // 1. Remove citations
  let processed = text.replace(/contentReference\[.*?\]\{.*?\}/g, '');

  // 2. Headers
  processed = processed.replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>');
  processed = processed.replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>');

  // 3. Bold & Code
  processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  processed = processed.replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>');

  // 4. Lists & Newlines
  const lines = processed.split('\n');
  let output = '';
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      if (!inList) {
        output += '<ul class="list-disc pl-6 mb-4 space-y-1">';
        inList = true;
      }
      output += `<li>${trimmed.substring(2)}</li>`;
    } else {
      if (inList) {
        output += '</ul>';
        inList = false;
      }
      if (trimmed.length === 0) {
        // Skip empty lines or add spacer if needed
      } else if (trimmed.startsWith('<h') || trimmed.startsWith('<div') || trimmed.startsWith('<table')) {
        output += trimmed;
      } else {
        output += trimmed + '<br />';
      }
    }
  }
  if (inList) output += '</ul>';

  return output;
}
