interface Dimensions {
  x: number;
  y: number;
}

export default function parseRLE(content: string) {
  if (!content) {
    throw new Error('No file content');
  }

  const lines = content.split('\n');

  return {
    headers: extractHeaders(lines),
    dimensions: extractDimensions(lines),
  };
}

function extractHeaders(lines: string[]): string {
  return lines.filter((line) => line.startsWith('#') || line.startsWith('x')).join('\n');
}

function extractDimensions(lines: string[]): Dimensions {
  const dimensionsLine = lines.find((line) => line.startsWith('x'));
  if (!dimensionsLine) {
    throw new Error('No valid dimensions found');
  }
  const splitDimensionsLine = dimensionsLine.split(',');
  if (splitDimensionsLine.length < 2 || !splitDimensionsLine[1].trim().startsWith('y')) {
    throw new Error('No valid dimensions found');
  }

  const xString = splitDimensionsLine[0];
  const yString = splitDimensionsLine[1];

  const splitXDimension = xString.split('=');
  const splitYDimension = yString.split('=');

  const xValue = parseInt(splitXDimension[1]);
  const yValue = parseInt(splitYDimension[1]);

  if (xValue < 1 || yValue < 1) {
    throw new Error('No valid dimensions found');
  }

  return {
    x: xValue,
    y: yValue,
  };
}
