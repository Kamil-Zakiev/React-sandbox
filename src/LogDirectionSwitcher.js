import React from 'react'

export default function LogDirectionSwitcher(props) {
    return (
        <button 
            onClick={props.onClick}
        >
            {props.isAsc ? '↓' :'↑'}
        </button>
    );
}