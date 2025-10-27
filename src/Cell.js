import React from "react";

const Cell = ({ cell, handleLeftClick, handleRightClick }) => {
  const displayValue = () => {
    if (!cell.revealed) {
      return cell.flagged ? "F" : null;
    }
    if (cell.value === "X") {
      return "X";
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
