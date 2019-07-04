import React from 'react'
import { connect } from 'react-redux'
import { ChangeLogDirection } from './store/actionCreators'

function LogDirectionSwitcher({ isAsc, onLogDirectionChange }) {
    return (
        <button
            className='control'
            onClick={onLogDirectionChange}
        >
            {isAsc ? '↓' : '↑'}
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