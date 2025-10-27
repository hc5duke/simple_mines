import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { initializeBoard } from "./utils";

const Board = () => {
  const [board, setBoard] = useState(initializeBoard(10, 10, 20));
  const [status, setStatus] = useState("playing"); // playing, won, lost

  useEffect(() => {
    checkWinCondition();
  }, [board]);

  const handleLeftClick = (row, col) => {
    if (status !== "playing") return;

    const newBoard = JSON.parse(JSON.stringify(board));
    if (newBoard[row][col].value === "X") {
      setStatus("lost");
      // Reveal all mines
      newBoard.forEach((row) =>
        row.forEach((cell) => {
          if (cell.value === "X") cell.revealed = true;
        }),
      );
    } else {
      revealCell(newBoard, row, col);
    }
    setBoard(newBoard);
  };

  const revealCell = (board, row, col) => {
    if (
      row < 0 ||
      row >= 10 ||
      col < 0 ||
      col >= 10 ||
      board[row][col].revealed
    )
      return;

    board[row][col].revealed = true;

    if (board[row][col].value === 0) {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          revealCell(board, row + x, col + y);
        }
      }
    }
  };

  const handleRightClick = (e, row, col) => {
    e.preventDefault();
    if (status !== "playing") return;

    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[row][col].flagged = !newBoard[row][col].flagged;
    setBoard(newBoard);
  };

  const checkWinCondition = () => {
    if (status !== "playing") return;

    const hasWon = board.every((row) =>
      row.every((cell) => cell.value === "X" || cell.revealed),
    );
    if (hasWon) {
      setStatus("won");
    }
  };

  const resetGame = () => {
    setBoard(initializeBoard(10, 10, 20));
    setStatus("playing");
  };

  return (
    <div className="board-container">
      <div className="status">
        {status === "won" && <div className="win">You Win!</div>}
        {status === "lost" && <div className="lost">Game Over</div>}
        <button onClick={resetGame}>Reset</button>
      </div>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <Cell
                key={colIndex}
                cell={cell}
                handleLeftClick={() => handleLeftClick(rowIndex, colIndex)}
                handleRightClick={(e) =>
                  handleRightClick(e, rowIndex, colIndex)
                }
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
