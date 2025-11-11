import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { initializeBoard } from "./utils";

const Board = () => {
  const [board, setBoard] = useState(initializeBoard(10, 10, 20));
  const [status, setStatus] = useState("playing"); // playing, won, lost
  const [debug, setDebug] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    checkWinCondition();
  }, [board]);

  useEffect(() => {
    let interval;
    if (status === "playing") {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setStatus("lost");
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const handleLeftClick = (row, col) => {
    if (status !== "playing" || board[row][col].flagged) return;

    let newBoard = JSON.parse(JSON.stringify(board));

    if (isFirstClick) {
      setIsFirstClick(false);
      if (newBoard[row][col].value === "💣") {
        let emptyCellFound = false;
        while (!emptyCellFound) {
          const newRow = Math.floor(Math.random() * 10);
          const newCol = Math.floor(Math.random() * 10);
          if (newBoard[newRow][newCol].value !== "💣") {
            newBoard[newRow][newCol].value = "💣";
            emptyCellFound = true;
          }
        }
        newBoard[row][col].value = 0;
        recalculateAdjacentMines(newBoard);
      }
    }

    if (newBoard[row][col].value === "💣") {
      setStatus("lost");
      // Reveal all mines
      newBoard.forEach((row) =>
        row.forEach((cell) => {
          if (cell.value === "💣") cell.revealed = true;
        }),
      );
    } else {
      revealCell(newBoard, row, col);
    }
    setBoard(newBoard);
  };

  const recalculateAdjacentMines = (board) => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j].value !== "💣") {
          let adjacentMines = 0;
          for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
              if (
                i + x >= 0 &&
                i + x < 10 &&
                j + y >= 0 &&
                j + y < 10 &&
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
      row.every((cell) => cell.value === "💣" || cell.revealed),
    );
    if (hasWon) {
      setStatus("won");
    }
  };

  const resetGame = () => {
    setBoard(initializeBoard(10, 10, 20));
    setStatus("playing");
    setIsFirstClick(true);
    setTimer(60);
  };

  return (
    <div className="board-container">
      {status !== "playing" && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={resetGame}>
              &times;
            </span>
            {status === "won" && <div className="win">You Win!</div>}
            {status === "lost" && <div className="lost">Game Over</div>}
          </div>
        </div>
      )}
      <div className="status">
        <div>Time: {timer}</div>
        <button onClick={resetGame}>Reset</button>
      </div>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <Cell
                key={colIndex}
                cell={cell}
                debug={debug}
                handleLeftClick={() => handleLeftClick(rowIndex, colIndex)}
                handleRightClick={(e) =>
                  handleRightClick(e, rowIndex, colIndex)
                }
              />
            ))}
          </div>
        ))}
      </div>
      <div className="debug-mode">
        <input
          type="checkbox"
          id="debug"
          checked={debug}
          onChange={() => setDebug(!debug)}
        />
        <label htmlFor="debug">Debug Mode</label>
      </div>
    </div>
  );
};

export default Board;
