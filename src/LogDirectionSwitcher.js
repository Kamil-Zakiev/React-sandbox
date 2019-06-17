import React from 'react'
import {Themes, ThemeContext} from './ThemeContext'

export default function LogDirectionSwitcher(props) {
    return (
        <button 
            onClick={props.onClick}
        >
            {props.isAsc ? '↓' :'↑'}
        </button>
    );
}