const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function calculateWinner(squares) {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a], [a, b, c]];
        }
    }

    return [null, null];
}

export function currentStatus({ squares, xIsNext }) {
    const [winner, winDirection] = calculateWinner(squares);
    let status;
    if (winner) {
        status = winner + ' has won!';
    } else {
        status = squares.indexOf(null) === -1
            ? 'Draw'
            : 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return [status, winner, winDirection];
}

export function isGameOver(board) {
    const [status] = currentStatus(board);
    return status === 'Draw' || status.indexOf('won') !== -1;
}