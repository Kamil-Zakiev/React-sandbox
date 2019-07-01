import React from 'react'

import { connect } from 'react-redux'
import * as actionCreators from './store/actionCreators'
import {hackCrossThemeStyle} from './hacks'

function MovesList(props) {
    const moves = props.history
        .map((stepInfo, move) => {
            const desc = move === 0
                ? 'Go to start'
                : `Go to #${move}(${getCoords(stepInfo)})`;
            const className = move === props.stepNumber ? 'control currentStep' : 'control';
            return (
                <li key={move}>
                    <button
                        className={className}
                        onClick={() => props.onMoveToStep(move)}
                    >
                        {desc}
                    </button>
                </li>
            );
        });

    return (
        <ul style={hackCrossThemeStyle}>
            {props.isAsc ? moves : moves.reverse()}
        </ul>
    );
}

function getCoords(stepInfo) {
    const cell = stepInfo.cell;
    const row = Math.floor(cell / 3);
    const col = cell - row * 3;
    return (row + 1) + ':' + (col + 1);
}

function mapStateToProps(state) {
    return {
        history: state.history,
        isAsc: state.isAsc,
        stepNumber: state.stepNumber
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onMoveToStep: (step) => dispatch(actionCreators.MoveToStep(step))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovesList);