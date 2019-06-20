import React from 'react'

import { connect } from 'react-redux'
import { ChangeLogDirection } from './store/actionCreators'

function LogDirectionSwitcher(props) {
    return (
        <button
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
        onLogDirectionChange: () => ChangeLogDirection()
    };
}

export default connect(mapStateToProps, mapDispathToProp)(LogDirectionSwitcher);