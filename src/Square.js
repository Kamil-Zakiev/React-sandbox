import React from 'react'
import {ThemeContext} from './ThemeContext'

export class Square extends React.Component {
    constructor(props) {
        super(props);

        this.buttonRef = React.createRef();
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        // call outside handler
        this.props.onClick();
    
        // lets animate this click!
        var pos = 0;
        var count = 0;
        var distance = 6;
        var id = setInterval(frame.bind(this), 15, this);
        function frame() {
            if (count++ === distance) {
                clearInterval(id);
            } else {
                if (count > distance/2){
                    pos -= 1;
                }
                else{
                    pos += 1;
                }
                this.buttonRef.current.style.top = pos + "px";
                this.buttonRef.current.style.left = pos + "px";
            }
        }
    }
    
    render() {    
        let className = "square " + (this.props.inWinDirection ? "winCell" : null);
        return (
            <ThemeContext.Consumer>
                {theme =>
                    <button
                        ref={this.buttonRef}
                        className={className + ' ' + theme + '-button'}
                        onClick={this.onClick}
                    >
                        {this.props.value}
                    </button>
                }
            </ThemeContext.Consumer>
            
        );
    }
}