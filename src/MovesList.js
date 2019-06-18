import React from 'react'

export default function MovesList(props) {
    const moves = props.history
        .map((stepInfo, move) => {
            const cell = stepInfo.cell;
            const row = Math.floor(cell / 3);
            const col = cell - row * 3;
            const step = (row + 1) + ':' + (col + 1);
            const desc = move === 0
                ? 'Go to start'
                : 'Go to #' + move + '(' + step + ')';
            return (
                <li key={move}>
                    <button
                        className={move === props.stepNumber ? 'currentStep' : null}
                        onClick={() => props.onStepClick(move)}
                    >
                        {desc}
                    </button>
                </li>
            );
        });
    return (
        <ul style={{ color: 'green' }}>
            {props.isAsc ? moves : moves.reverse()}
        </ul>
    );
}