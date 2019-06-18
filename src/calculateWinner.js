export function calculateWinner(squares) {
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

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a], [a, b, c]];
        }
    }

    return [null, null];
}

export function currentStatus(board) {
    const [winner, winDirection] = calculateWinner(board.squares);
    let status;
    if (winner) {
        status = winner + ' has won!';
    } else {
        status = board.squares.indexOf(null) === -1
            ? 'Draw'
            : 'Next player: ' + (board.xIsNext ? 'X' : 'O');
    }

    return [status, winDirection];
}

export function isGameOver(status) {
    return status === 'Draw' || status.indexOf('won') !== -1;
}