export interface Dimensions {
  x: number;
  y: number;
}

export interface PatternFileData {
  headers: string;
  dimensions: Dimensions;
  matrix: string[][];
}
