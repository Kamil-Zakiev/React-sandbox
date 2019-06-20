const ClickCell = (i) => {
    return {
        type: 'CLICK_CELL',
        cell: i
    };
};

const ChangeTheme = () => {
    return {
        type: 'CHANGE_THEME'
    };
};

const ChangeLogDirection = () => {
    return {
        type: 'CHANGE_LOG_DIR'
    };
};

const MoveToStep = (step) => {
    return {
        type: 'MOVE_TO_STEP',
        step: step
    };
};

const SetAllowModal = (isAllowed) => {
    return {
        type: 'SET_ALLOW_MODAL',
        isAllowed: isAllowed
    };
};

export { ClickCell, ChangeTheme, ChangeLogDirection, MoveToStep, SetAllowModal };