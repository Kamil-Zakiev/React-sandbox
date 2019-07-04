import React from 'react';
import Square from './Square'

const Board = () => {
  const rowCount = 3;
  const colCount = 3;

  let rows = [];
  let squareIndex = 0;
  for (let i = 0; i < rowCount; i++) {
    let row = [];
    for (let j = 0; j < colCount; j++) {
      row.push(
        <Square
          key={squareIndex}
          index={squareIndex}
        />
      );
      squareIndex++;
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