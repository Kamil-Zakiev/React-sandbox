import React from 'react'
import {Themes, ThemeContext} from './ThemeContext'

export default function ThemeSwitcher(props){
    return (
        <button
            onClick={props.onClick}
        >
            Switch theme
        </button>
    );
}