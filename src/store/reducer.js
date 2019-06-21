import { calculateWinner } from '../calculateWinner'
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
    allowModal: false
};

export default function reducer(state = initialState, action) {
    var newState = { ...state };

    if (action.type === actions.CLICK_CELL) {
        const current = newState.history[newState.stepNumber];
        if (current.squares[action.cell] || calculateWinner(current.squares)[0]) {
            return newState;
        }

        const squares = current.squares.slice();
        squares[action.cell] = current.xIsNext ? 'X' : 'O';
        
        // need to provide a new array to keep a function pure
        newState.history = newState.history
            .slice(0, newState.stepNumber + 1)
            .concat({
                squares: squares,
                xIsNext: !current.xIsNext,
                cell: action.cell
            });
        newState.stepNumber++;
        newState.allowModal = true;
    }

    if (action.type === actions.CHANGE_THEME) {
        newState.theme = Themes.oppositeOf(newState.theme);
    }

    if (action.type === actions.CHANGE_LOG_DIR) {
        newState.isAsc = !newState.isAsc;
    }

    if (action.type === actions.MOVE_TO_STEP) {
        newState.stepNumber = action.step;
    }

    if (action.type === actions.SET_ALLOW_MODAL) {
        newState.allowModal = action.isAllowed;
    }

    return newState;
}