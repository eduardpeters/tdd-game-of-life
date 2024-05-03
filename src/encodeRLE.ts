import { ALIVE_CELL, DEAD_CELL, RLE_LINE_BREAK, RLE_PATTERN_END } from './constants';
import { Dimensions, PatternFileData } from './types';

export default function encodeRLE(data: PatternFileData) {
  const headers = buildHeaders(data.headers, data.dimensions);
  const pattern = buildPattern(data.matrix);
  return `${headers}\n${pattern}`;
}

function buildHeaders(headers: string, dimensions: Dimensions): string {
  const splitHeaders = headers.split('\n');
  let dimensionsRow = splitHeaders.length - 1;
  const dimensionsHeader = splitHeaders[dimensionsRow];
  const splitDimensionsHeader = dimensionsHeader.split(',');

  const newDimensionsHeader = [`x = ${dimensions.x}, y = ${dimensions.y}`];
  if (splitDimensionsHeader.length > 2) {
    // Add rules if there are any
    newDimensionsHeader.push(splitDimensionsHeader[2]);
  }

  splitHeaders[dimensionsRow] = newDimensionsHeader.join(',');

  return splitHeaders.join('\n');
}

function buildPattern(matrix: string[][]): string {
  let patternString = '';

  for (let row = 0; row < matrix.length; row++) {
    let rowString = encodeRow(matrix[row]);
    if (row < matrix.length - 1) {
      rowString += RLE_LINE_BREAK;
    }
    patternString += rowString;
  }

  return patternString + RLE_PATTERN_END;
}

function encodeRow(row: string[]) {
  let rowString = '';
  let tagCount = 1;
  let currentTag = row[0];
  for (let column = 1; column < row.length; column++) {
    if (currentTag === row[column]) {
      tagCount++;
    } else {
      rowString += encodeTagCount(currentTag, tagCount);

      tagCount = 1;
      currentTag = row[column];
    }
  }
  if (currentTag === ALIVE_CELL || (rowString.length === 0 && currentTag === DEAD_CELL)) {
    rowString += encodeTagCount(currentTag, tagCount);
  }

  return rowString;
}

function encodeTagCount(currentTag: string, tagCount: number) {
  return `${tagCount > 1 ? tagCount : ''}${currentTag}`;
}
