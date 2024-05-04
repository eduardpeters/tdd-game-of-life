import { ALIVE_CELL, DEAD_CELL } from './constants';

export default function runSimulations(matrix: string[][], generations: number) {
  // Nothing to do if no generations are to be run
  if (generations === 0) {
    return matrix;
  }

  const simulated: string[][] = [];

  for (let row = 0; row < matrix.length; row++) {
    simulated.push([]);
    for (let column = 0; column < matrix[row].length; column++) {
      const aliveNeighbors = countNeighbors(matrix, row, column);

      console.log(aliveNeighbors, column);
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
    if (column < matrix[row].length - 1) {
      aliveNeighbors += matrix[row - 1][column + 1] === ALIVE_CELL ? 1 : 0;
    }
  }
  if (column > 0) {
    aliveNeighbors += matrix[row][column - 1] === ALIVE_CELL ? 1 : 0;
  }
  if (column < matrix[row].length - 1) {
    aliveNeighbors += matrix[row][column + 1] === ALIVE_CELL ? 1 : 0;
  }
  if (row < matrix.length - 1) {
    aliveNeighbors += matrix[row + 1][column] === ALIVE_CELL ? 1 : 0;
    if (column > 0) {
      aliveNeighbors += matrix[row + 1][column - 1] === ALIVE_CELL ? 1 : 0;
    }
    if (column < matrix[row].length - 1) {
      aliveNeighbors += matrix[row + 1][column + 1] === ALIVE_CELL ? 1 : 0;
    }
  }

  return aliveNeighbors;
}
