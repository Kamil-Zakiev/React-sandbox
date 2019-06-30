import React from 'react';
import Square from './Square'

const Board = () => {
  const rowCount = 3;
  const colCount = 3;

  let rows = [];
  for (let i = 0; i < rowCount; i++) {
    let row = [];
    for (let j = 0; j < colCount; j++) {
      const squareIndex = i * rowCount + j;
      row.push(
        <Square
          key={squareIndex}
          index={squareIndex}
        />
      );
    }
    rows.push(
      <div
        key={i}
        className="board-row"
      >
        {row}
      </div>
    );
  }

  return <div>{rows}</div>;
};

export default Board;