import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './store/actionCreators';

function ThemeSwitcher(props) {
    return (
        <button 
            className='control'
            onClick={props.onThemeChange}
        >
            Switch theme
        </button>
    );
}

function mapDispatchToProp(dispatch) {
    return {
        onThemeChange: () => dispatch(actionCreators.ChangeTheme())
    }
}

export default connect(null, mapDispatchToProp)(ThemeSwitcher);