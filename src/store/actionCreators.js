import * as actions from './actionTypes'

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

export { ClickCell, ChangeTheme, ChangeLogDirection, MoveToStep, SetAllowModal, CellPressed };