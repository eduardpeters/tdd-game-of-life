import { ALIVE_CELL, DEAD_CELL } from './constants';

interface BoundaryExpansions {
  above: string[];
  below: string[];
  left: string[];
  right: string[];
}

export default function runSimulations(matrix: string[][], generations: number) {
  // Nothing to do if no generations are to be run
  if (generations === 0) {
    return matrix;
  }

  const simulated: string[][] = [];

  const boundaryExpansions = checkBoundaryExpansions(matrix);

  for (let row = 0; row < matrix.length; row++) {
    simulated.push([]);

    for (let column = 0; column < matrix[0].length; column++) {
      const aliveNeighbors = countNeighbors(matrix, row, column);

      console.log(row, column, aliveNeighbors);
      if (aliveNeighbors === 3) {
        simulated[row].push(ALIVE_CELL);
      } else if (matrix[row][column] === ALIVE_CELL) {
        if (aliveNeighbors > 3 || aliveNeighbors < 2) {
          simulated[row].push(DEAD_CELL);
        } else {
          simulated[row].push(ALIVE_CELL);
        }
      } else {
        simulated[row].push(DEAD_CELL);
      }
    }
  }

  if (boundaryExpansions.above.length > 0) {
    simulated.unshift(boundaryExpansions.above);
  }
  if (boundaryExpansions.below.length > 0) {
    simulated.push(boundaryExpansions.below);
  }
  if (boundaryExpansions.left.length > 0) {
    console.log(boundaryExpansions.left);
    if (boundaryExpansions.above.length > 0) {
      boundaryExpansions.left.unshift(DEAD_CELL);
    }
    if (boundaryExpansions.below.length > 0) {
      boundaryExpansions.left.push(DEAD_CELL);
    }
    for (let row = 0; row < matrix.length; row++) {
      simulated[row].unshift(boundaryExpansions.left[row]);
    }
  }
  console.log(simulated);
  return simulated;
}

function countNeighbors(matrix: string[][], row: number, column: number) {
  let aliveNeighbors = 0;

  if (row > 0) {
    aliveNeighbors += matrix[row - 1][column] === ALIVE_CELL ? 1 : 0;
    if (column > 0) {
      aliveNeighbors += matrix[row - 1][column - 1] === ALIVE_CELL ? 1 : 0;
    }
    if (column < matrix[row - 1].length - 1) {
      aliveNeighbors += matrix[row - 1][column + 1] === ALIVE_CELL ? 1 : 0;
    }
  }
  if (row >= 0 && column > 0) {
    aliveNeighbors += matrix[row][column - 1] === ALIVE_CELL ? 1 : 0;
  }
  if (row >= 0 && column < matrix[row].length - 1) {
    aliveNeighbors += matrix[row][column + 1] === ALIVE_CELL ? 1 : 0;
  }
  if (row < matrix.length - 1) {
    aliveNeighbors += matrix[row + 1][column] === ALIVE_CELL ? 1 : 0;
    if (column > 0) {
      aliveNeighbors += matrix[row + 1][column - 1] === ALIVE_CELL ? 1 : 0;
    }
    if (column < matrix[row + 1].length - 1) {
      aliveNeighbors += matrix[row + 1][column + 1] === ALIVE_CELL ? 1 : 0;
    }
  }

  return aliveNeighbors;
}

function checkBoundaryExpansions(matrix: string[][]): BoundaryExpansions {
  const boundaryExpansions: BoundaryExpansions = { above: [], below: [], left: [], right: [] };

  boundaryExpansions.above = checkNewRow(matrix);
  boundaryExpansions.below = checkNewRow(matrix, false);
  boundaryExpansions.left = checkNewColumn(matrix);

  return boundaryExpansions;
}

function checkNewRow(matrix: string[][], isAbove = true): string[] {
  const row = isAbove ? 0 : matrix.length - 1;
  let keepNewRow = false;
  const newRow: string[] = [DEAD_CELL];
  for (let column = 1; column < matrix[row].length - 1; column++) {
    let neighborCount = 0;
    if (matrix[row][column - 1] === ALIVE_CELL) {
      neighborCount += 1;
    }
    if (matrix[row][column] === ALIVE_CELL) {
      neighborCount += 1;
    }
    if (matrix[row][column + 1] === ALIVE_CELL) {
      neighborCount += 1;
    }
    if (neighborCount === 3) {
      newRow.push(ALIVE_CELL);
      keepNewRow = true;
    } else {
      newRow.push(DEAD_CELL);
    }
  }
  if (keepNewRow) {
    newRow.push(DEAD_CELL);
    return newRow;
  }

  return [];
}

function checkNewColumn(matrix: string[][], isLeft = true): string[] {
  const column = isLeft ? 0 : matrix.length - 1;
  let keepNewColumn = false;
  const newColumn: string[] = [DEAD_CELL];
  for (let row = 1; row < matrix.length - 1; row++) {
    let neighborCount = 0;
    if (matrix[row - 1][column] === ALIVE_CELL) {
      neighborCount += 1;
    }
    if (matrix[row][column] === ALIVE_CELL) {
      neighborCount += 1;
    }
    if (matrix[row + 1][column] === ALIVE_CELL) {
      neighborCount += 1;
    }
    if (neighborCount === 3) {
      newColumn.push(ALIVE_CELL);
      keepNewColumn = true;
    } else {
      newColumn.push(DEAD_CELL);
    }
  }
  if (keepNewColumn) {
    newColumn.push(DEAD_CELL);
    return newColumn;
  }

  return [];
}
