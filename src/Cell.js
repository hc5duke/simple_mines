import React from "react";

const Cell = ({ cell, debug, handleLeftClick, handleRightClick }) => {
  const displayValue = () => {
    if (!cell.revealed) {
      return cell.flagged ? "🚩" : null;
    }
    if (cell.value === "💣") {
      return "💣";
    }
    return cell.value > 0 ? cell.value : null;
  };

  const cellClass = `cell ${cell.revealed ? "revealed" : ""} ${debug && cell.value === "💣" ? "debug" : ""}`;

  return (
    <div
      className={cellClass}
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
    >
      {displayValue()}
    </div>
  );
};

export default Cell;
