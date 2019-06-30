import * as actions from './actions'

const ClickCell = (i) => {
    return {
        type: actions.CLICK_CELL,
        cell: i
    };
};

const ChangeTheme = () => {
    return {
        type: actions.CHANGE_THEME
    };
};

const ChangeLogDirection = () => {
    return {
        type: actions.CHANGE_LOG_DIR
    };
};

const MoveToStep = (step) => {
    return {
        type: actions.MOVE_TO_STEP,
        step: step
    };
};

const SetAllowModal = (isAllowed) => {
    return {
        type: actions.SET_ALLOW_MODAL,
        isAllowed: isAllowed
    };
};

const CellPressed = (cell) => {
    return {
        type: actions.CELL_PRESSED,
        payload: {
            cell: cell
        }
    };
};

const GameOver = ({winner, winPath}) => {
    return {
        type: actions.GAME_OVER,
        payload: {
            winner, 
            winPath
        }
    };
};

export { ClickCell, ChangeTheme, ChangeLogDirection, MoveToStep, SetAllowModal, CellPressed, GameOver };