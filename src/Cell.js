import React from "react";

const Cell = ({ cell, handleLeftClick, handleRightClick }) => {
  const displayValue = () => {
    if (!cell.revealed) {
      return cell.flagged ? "🚩" : null;
    }
    if (cell.value === "💣") {
      return "💣";
    }
    return cell.value > 0 ? cell.value : null;
  };

  return (
    <div
      className={`cell ${cell.revealed ? "revealed" : ""}`}
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
    >
      {displayValue()}
    </div>
  );
};

export default Cell;
