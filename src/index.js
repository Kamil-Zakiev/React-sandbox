import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
  
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
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
      stepNumber: 0
    };
  }

  render() {
    const current = this.getCurrentBoard();
    const status = this.getCurrentGameStatus();
    const moves = this.getMoves();
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            xIsNext={current.xIsNext}
            onClick={this.handleClick.bind(this)}/>
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ul>{ moves }</ul>
        </div>
      </div>
    );
  }
  
  handleClick(i) {
    const current = this.getCurrentBoard();
    if(current.squares[i] || calculateWinner(current.squares)){
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

  getCurrentGameStatus(){
    const current = this.getCurrentBoard();
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = winner + ' has won!';
    } else {
      status = 'Next player: ' + (current.xIsNext ? 'X' : 'O');
    }
    
    return status;
  }

  getMoves() {
    return this.state.history.map((stepInfo, move) => {
      const cell = stepInfo.cell;
      const row = Math.floor(cell / 3);
      const col = cell - row * 3;
      const step = (row + 1) + ':' + (col + 1);
      const desc = move === 0 ? 'Go to start' : 'Go to #' + move + '(' + step + ')';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
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
      return squares[a];
    }
  }
  return null;
}
  