import React from 'react';
import ErrorBoundary from './ErrorBoundary'
import Board from './Board'
import calculateWinner from './calculateWinner'

export default class Game extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        history: [{
          squares: Array(9).fill(null),
          xIsNext: true
        }],
        stepNumber: 0,
        isAsc: true
      };
    }

    componentDidMount() {
        document.title = this.getCurrentGameStatus()[0];
    }

    componentDidUpdate() {
        document.title = this.getCurrentGameStatus()[0];
    }
  
    render() {
      const current = this.getCurrentBoard();
      const [status, winDirection] = this.getCurrentGameStatus();
      const moves = this.getMoves();
      return (
        <div className="game">
          <div className="game-board">
            <ErrorBoundary>
              <Board 
                squares={current.squares}
                xIsNext={current.xIsNext}
                winDirection={winDirection}
                onClick={this.handleClick.bind(this)}/>
            </ErrorBoundary>
          </div>
          <div className="game-info">
            <div>{ status }</div>
            <div>
              <button 
                onClick={this.switchLogDirection.bind(this)}
              >
                {this.state.isAsc ? '↓' :'↑'}
              </button>
            </div>
            <ul>{ this.state.isAsc ? moves : moves.reverse() }</ul>
          </div>
        </div>
      );
    }
  
    switchLogDirection() {
      this.setState({
        isAsc: !this.state.isAsc
      });
    }
    
    handleClick(i) {
      const current = this.getCurrentBoard();
      if(current.squares[i] || calculateWinner(current.squares)[0]){
        return;
      }
  
      const squares = current.squares.slice();
      squares[i] = current.xIsNext ? 'X' : 'O';
      this.setState({ 
        history: this.state.history.slice(0, this.state.stepNumber + 1).concat({
          squares: squares,
          xIsNext: !current.xIsNext,
          cell: i
        }),
        stepNumber: this.state.stepNumber + 1
      });
    }
  
    getCurrentBoard() {
      return this.state.history[this.state.stepNumber];
    }
  
    getCurrentGameStatus() {
      const current = this.getCurrentBoard();
      const [winner, winDirection] = calculateWinner(current.squares);
      let status;
      if (winner) {
        status = winner + ' has won!';
      } else {
        status = current.squares.indexOf(null) === -1
          ? 'Draw'
          : 'Next player: ' + (current.xIsNext ? 'X' : 'O');
      }
      
      return [status, winDirection];
    }
  
    getMoves() {    
      return this.state.history
        .map((stepInfo, move) => {
          const cell = stepInfo.cell;
          const row = Math.floor(cell / 3);
          const col = cell - row * 3;
          const step = (row + 1) + ':' + (col + 1);
          const desc = move === 0 ? 'Go to start' : 'Go to #' + move + '(' + step + ')';
          return (
            <li key={move}>
              <button
                className={move === this.state.stepNumber ? "currentStep" : null}
                onClick={() => this.jumpTo(move)}
              >
                {desc}
              </button>
            </li>
          );
        })
    }
  
    jumpTo(move) {
      this.setState({ stepNumber: move });
    }
  }
  