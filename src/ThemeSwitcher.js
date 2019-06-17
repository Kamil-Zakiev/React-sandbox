import React from 'react'

export default function ThemeSwitcher(props){
    return (
        <button
            onClick={props.onClick}
        >
            Switch theme
        </button>
    );
}