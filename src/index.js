import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
  let className = "square " + (props.inWinDirection ? "winCell" : null);
  return (
    <button className={className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}
  
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square key={i}
        inWinDirection={this.props.winDirection && this.props.winDirection.indexOf(i) !== -1}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const rowCount = 3;
    const colCount = 3;

    let rows = [];
    for(let i = 0; i < rowCount; i++) {
      let row = [];
      for(let j = 0; j < colCount; j++) {
        row.push(this.renderSquare(i*rowCount + j));
      }
      rows.push(
        <div 
          key={i}
          className="board-row"
        >
          {row}
        </div>
        );
    }

    return (
      <div>
        {rows}
      </div>
    );
  }
}
  
class Game extends React.Component {
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

  render() {
    const current = this.getCurrentBoard();
    const [status, winDirection] = this.getCurrentGameStatus();
    const moves = this.getMoves();
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            xIsNext={current.xIsNext}
            winDirection={winDirection}
            onClick={this.handleClick.bind(this)}/>
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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// helper function
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], [a, b, c]];
    }
  }
  return [null, null];
}
 