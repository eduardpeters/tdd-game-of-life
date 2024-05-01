export default function parseRLE(content: string) {
  if (!content) {
    throw new Error('No file content');
  }

  const lines = content.split('\n');

  return {
    headers: lines.slice(0, 3).join('\n'),
  };
}
