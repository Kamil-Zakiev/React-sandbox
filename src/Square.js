import React, {useRef, useContext} from 'react'
import {ThemeContext} from './ThemeContext'

export function Square(props) {
    let ref = useRef(null);

    function onClick() {
        // call outside handler
        props.onClick();
    
        // lets animate this click!
        var pos = 0;
        var count = 0;
        var distance = 6;
        var id = setInterval(() => {
            if (count++ === distance) {
                clearInterval(id);
            } else {
                pos += Math.sign(distance / 2 - count); 
                ref.current.style.top = pos + "px";
                ref.current.style.left = pos + "px";
            }
        }, 15);
    }

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