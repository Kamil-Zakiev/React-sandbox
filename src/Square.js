import React from 'react'

export function Square(props) {
    let className = "square " + (props.inWinDirection ? "winCell" : null);
    return (
        <button 
            className={className} 
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}