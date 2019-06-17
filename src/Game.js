import React from 'react';
import ErrorBoundary from './ErrorBoundary'
import Board from './Board'
import calculateWinner from './calculateWinner'
import {Themes, ThemeContext} from './ThemeContext'
import ThemeSwitcher from './ThemeSwitcher'
import LogDirectionSwitcher from './LogDirectionSwitcher'
import Modal from './Modal';

export default class Game extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        history: [{
          squares: Array(9).fill(null),
          xIsNext: true
        }],
        stepNumber: 0,
        isAsc: true,
        theme: Themes.light,
        allowModal: false
      };

      this.handleClick = this.handleClick.bind(this);
      this.switchLogDirection = this.switchLogDirection.bind(this);
      this.switchTheme = this.switchTheme.bind(this);
    }

    componentDidMount() {
        document.title = this.getCurrentGameStatus()[0];

        // todo: extract this hack:
        const background = this.state.theme === Themes.dark ? 'black' : 'lightblue'
        document.getElementById('root').style.background = background;
    }

    componentDidUpdate() {
        document.title = this.getCurrentGameStatus()[0];

        // todo: extract this hack:
        const background = this.state.theme === Themes.dark ? 'black' : 'lightblue'
        document.getElementById('root').style.background = background;
    }
  
    render() {
      const current = this.getCurrentBoard();
      const [status, winDirection] = this.getCurrentGameStatus();
      const moves = this.getMoves();
      return (
        <ThemeContext.Provider value={this.state.theme}>
            <div className="game">
                <div className="game-board">
                    <ErrorBoundary>
                        <Board
                            squares={current.squares}
                            xIsNext={current.xIsNext}
                            winDirection={winDirection}
                            onClick={this.handleClick}
                        />
                    </ErrorBoundary>
                </div>
                <div className="game-info">
                    <div style={{color: 'green'}}>{ status }</div>
                    <LogDirectionSwitcher 
                        onClick={this.switchLogDirection}
                        isAsc={this.state.isAsc}
                    />
                    <ThemeSwitcher
                        onClick={this.switchTheme}
                    />
                    <ul style={{color: 'green'}}>{ this.state.isAsc ? moves : moves.reverse() }</ul>
                </div>
                {this.renderModal(status)}
            </div>
        </ThemeContext.Provider>
      );
    }

    renderModal(status) {
      // todo: remove this nasty check...
      if (status === 'Draw' || status.indexOf('won') !== -1) {
        if(!this.state.allowModal){
          return null;
        }

        return (
          <Modal>
            <div className='winner-panel'>
              {status}
              <div>
                <button onClick={() => this.setState({allowModal : false})}>
                  OK
                </button>
              </div>
            </div>
          </Modal>
        );
      }
      return null;
    }
  
    switchLogDirection() {
      this.setState({
        isAsc: !this.state.isAsc
      });
    }

    switchTheme() {        
        this.setState({
          theme: this.state.theme === Themes.dark ? Themes.ligth : Themes.dark
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
        stepNumber: this.state.stepNumber + 1,
        allowModal: true
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
  