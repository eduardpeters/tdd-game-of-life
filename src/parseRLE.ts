import { ALIVE_CELL, DEAD_CELL, RLE_LINE_BREAK, RLE_PATTERN_END } from './constants';
import type { Dimensions, PatternFileData } from './types';

export default function parseRLE(content: string): PatternFileData {
  if (!content) {
    throw new Error('No file content');
  }

  const lines = content.split('\n');

  const dimensions = extractDimensions(lines);

  return {
    headers: extractHeaders(lines),
    dimensions: dimensions,
    matrix: buildMatrix(dimensions, lines),
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

function buildMatrix(dimensions: Dimensions, lines: string[]) {
  const matrix = [];
  const pattern = lines.filter((line) => !line.startsWith('#') && !line.startsWith('x')).join();
  let patternEndFlag = false;
  const patternRows = pattern.split(RLE_LINE_BREAK);
  for (let row of patternRows) {
    if (patternEndFlag) break;
    if (row.includes(RLE_PATTERN_END)) {
      patternEndFlag = true;
    }
    const newRow = parseRow(row, dimensions.x);
    matrix.push(newRow);
  }
  return matrix;
}

function parseRow(patternRow: string, rowLength: number): string[] {
  const newRow = [];
  const splitRow = patternRow.split('');
  let runCount = 1;
  for (let tag of splitRow) {
    if (tag === RLE_PATTERN_END) break;
    if (![ALIVE_CELL, DEAD_CELL].includes(tag)) {
      runCount = parseInt(tag);
    } else {
      for (let i = 0; i < runCount; i++) {
        newRow.push(tag);
      }
      runCount = 1;
    }
  }
  while (newRow.length < rowLength) {
    newRow.push(DEAD_CELL);
  }
  return newRow;
}
