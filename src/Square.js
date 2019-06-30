import React, { useRef, useContext, useCallback } from 'react'
import { connect } from 'react-redux'
import { ThemeContext } from './ThemeContext'
import { currentStatus } from './calculateWinner'
import { ClickCell } from './store/actionCreators'

function Square(props) {
    const ref = useRef(null);
    const { index, dispatch } = props;
    const onClick = useCallback(() => {
        dispatch(ClickCell(index));

        // lets animate this click!
        // todo: this side effect could be a candidate for a extract to a saga
        var pos = 0;
        var count = 0;
        var distance = 6;
        var id = setInterval(() => {
            if (count++ === distance) {
                clearInterval(id);
            } else {
                pos += Math.sign(distance / 2 - count + 0.1); // math magic
                ref.current.style.top = pos + "px";
                ref.current.style.left = pos + "px";
            }
        }, 15);
    }, [index, dispatch]);

    const theme = useContext(ThemeContext);
    let className = 'square ' + (props.inWinDirection ? 'winCell' : null) + ' ' + theme + '-button';
    return (
        <button
            ref={ref}
            className={className}
            onClick={onClick}
        >
            {props.value}
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