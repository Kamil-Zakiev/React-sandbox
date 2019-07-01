import React from 'react'

import { connect } from 'react-redux'
import { ChangeLogDirection } from './store/actionCreators'

function LogDirectionSwitcher(props) {
    return (
        <button
            className='control'
            onClick={props.onLogDirectionChange}
        >
            {props.isAsc ? '↓' : '↑'}
        </button>
    );
}

function mapStateToProps(state) {
    return {
        isAsc: state.isAsc
    };
}

function mapDispathToProp(dispatch) {
    return {
        onLogDirectionChange: () => dispatch(ChangeLogDirection())
    };
}

export default connect(mapStateToProps, mapDispathToProp)(LogDirectionSwitcher);