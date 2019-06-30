import { isGameOver } from '../calculateWinner'
import { Themes } from '../ThemeContext'
import * as actions from './actions'

const initialState = {
    history: [{
        squares: Array(9).fill(null),
        xIsNext: true
    }],
    stepNumber: 0,
    isAsc: true,
    theme: Themes.light,
    gameState: {
        ack: false
    }
};

export default function reducer(state = initialState, action) {
    var newState = { ...state };

    if (action.type === actions.CELL_PRESSED) {
        const current = newState.history[newState.stepNumber];
        const pressedCell = action.payload.cell;
        if (current.squares[pressedCell] || isGameOver(current)) {
            return newState;
        }

        const squares = current.squares.slice();
        squares[pressedCell] = current.xIsNext ? 'X' : 'O';

        // need to provide a new array to keep a function pure
        newState.history = newState.history
            .slice(0, newState.stepNumber + 1)
            .concat({
                squares: squares,
                xIsNext: !current.xIsNext,
                cell: pressedCell
            });
        newState.stepNumber++;
        newState.allowModal = true;
        newState.gameState = Object.assign({}, newState.gameState, {
            ack: false
        });
    }

    if (action.type === actions.CHANGE_THEME) {
        newState.theme = Themes.oppositeOf(newState.theme);
    }

    if (action.type === actions.CHANGE_LOG_DIR) {
        newState.isAsc = !newState.isAsc;
    }

    if (action.type === actions.MOVE_TO_STEP) {
        newState.stepNumber = action.step;
        newState.gameState = Object.assign({}, state.gameState, {
            ack: false
        });
    }

    if (action.type === actions.SET_ALLOW_MODAL) {
        newState.gameState = Object.assign({}, state.gameState, {
            ack: true
        });
    }

    return newState;
}