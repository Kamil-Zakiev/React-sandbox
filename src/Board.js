import React from 'react';
import { Square } from './Square'

import { connect } from 'react-redux'
import { ClickCell } from './store/actionCreators'

class Board extends React.Component {
    renderSquare(i) {
        const { onCellClick, winDirection, squares } = this.props;
        return (
            <Square key={i}
                inWinDirection={winDirection && winDirection.indexOf(i) !== -1}
                value={squares[i]}
                onClick={() => onCellClick(i)}
            />
        );
    }

    render() {
        const rowCount = 3;
        const colCount = 3;

        let rows = [];
        for (let i = 0; i < rowCount; i++) {
            let row = [];
            for (let j = 0; j < colCount; j++) {
                row.push(this.renderSquare(i * rowCount + j));
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

function mapStateToProps(state) {
    return {
        squares: state.history[state.stepNumber].squares,
        xIsNext: state.xIsNext
    }
}

function mapDispatchToProp(dispatch) {
    return {
        onCellClick: (i) => dispatch(ClickCell(i))
    };
}

export default connect(mapStateToProps, mapDispatchToProp)(Board);