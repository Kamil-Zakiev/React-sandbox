import React, { useRef, useContext, useCallback } from 'react'
import { connect } from 'react-redux'
import { ThemeContext } from './ThemeContext'
import { currentStatus } from './calculateWinner'
import { ClickCell } from './store/actionCreators'
import click from './effects/click';

export function Square({ index, dispatch, inWinDirection, value }) {
    const ref = useRef(null);
    const onClick = useCallback(() => {
        dispatch(ClickCell(index));
        click(ref.current);
    }, [index, dispatch]); // suppose ref.current is always actual so not incuding to dependency list

    const theme = useContext(ThemeContext);
    const className = `square ${inWinDirection && 'winCell'} ${theme}-button`;
    return (
        <button
            ref={ref}
            className={className}
            onClick={onClick}
        >
            {value}
        </button>
    );
}

function mapStateToProps(state, props) {
    const [, , winDirection] = currentStatus(state.history[state.stepNumber]);
    return {
        value: state.history[state.stepNumber].squares[props.index],
        inWinDirection: winDirection && winDirection.indexOf(props.index) !== -1
    }
}

export default connect(mapStateToProps)(Square);