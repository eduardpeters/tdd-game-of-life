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
    let rowString = '';
    let tagCount = 1;
    let currentTag = matrix[row][0];
    for (let column = 1; column < matrix[row].length; column++) {
      if (currentTag === matrix[row][column]) {
        tagCount++;
      } else {
        if (tagCount > 1) {
          rowString += tagCount;
        }
        rowString += currentTag;

        tagCount = 1;
        currentTag = matrix[row][column];
      }
    }
    if (currentTag === ALIVE_CELL) {
      if (tagCount > 1) {
        rowString += tagCount;
      }
      rowString += currentTag;
    }
    if (row < matrix.length - 1) {
      rowString += RLE_LINE_BREAK;
    }
    patternString += rowString;
  }
  return patternString + RLE_PATTERN_END;
}
