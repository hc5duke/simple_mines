export const initializeBoard = (rows, cols, mines) => {
  const board = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      value: 0,
      revealed: false,
      flagged: false,
    })),
  );

  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (board[row][col].value !== "💣") {
      board[row][col].value = "💣";
      minesPlaced++;
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j].value !== "💣") {
        let adjacentMines = 0;
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (
              i + x >= 0 &&
              i + x < rows &&
              j + y >= 0 &&
              j + y < cols &&
              board[i + x][j + y].value === "💣"
            ) {
              adjacentMines++;
            }
          }
        }
        board[i][j].value = adjacentMines;
      }
    }
  }

  return board;
};
