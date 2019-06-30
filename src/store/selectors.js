const currentBoardSelector = state => state.history[state.stepNumber];
const opponentSelector = s => s.history[s.stepNumber].xIsNext ? 'O' : 'X';

export { currentBoardSelector, opponentSelector };