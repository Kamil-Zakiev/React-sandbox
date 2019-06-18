import React from 'react';
import {Square} from './Square'

export default class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square key={i}
            inWinDirection={this.props.winDirection && this.props.winDirection.indexOf(i) !== -1}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
        const rowCount = 3;
        const colCount = 3;

        let rows = [];
        for(let i = 0; i < rowCount; i++) {
            let row = [];
            for(let j = 0; j < colCount; j++) {
            row.push(this.renderSquare(i*rowCount + j));
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
    }
}