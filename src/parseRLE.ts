export default function parseRLE(content: string) {
  if (!content) {
    throw new Error('No file content');
  }

  const lines = content.split('\n');

  return {
    headers: extractHeaders(lines),
  };
}

function extractHeaders(lines: string[]): string {
  return lines.filter((line) => line.startsWith('#')).join('\n');
}
