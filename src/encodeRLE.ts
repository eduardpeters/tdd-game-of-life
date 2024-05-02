import { ALIVE_CELL, DEAD_CELL, RLE_LINE_BREAK, RLE_PATTERN_END } from './constants';
import { Dimensions, PatternFileData } from './types';

export default function encodeRLE(data: PatternFileData) {
  const headers = buildHeaders(data.headers, data.dimensions);
  return headers;
}

function buildHeaders(headers: string, dimensions: Dimensions): string {
  const splitHeaders = headers.split('\n');
  let dimensionsRow = splitHeaders.length - 1;
  const dimensionsHeader = splitHeaders[dimensionsRow];
  const splitDimensionsHeader = dimensionsHeader.split(',');

  const newDimensionsHeader = [`x = ${dimensions.x}, y = ${dimensions.y}`];
  if (splitDimensionsHeader.length > 2) {
    // Add rules
    newDimensionsHeader.push(splitDimensionsHeader[2]);
  }

  splitHeaders[dimensionsRow] = newDimensionsHeader.join(',');

  return splitHeaders.join('\n');
}
