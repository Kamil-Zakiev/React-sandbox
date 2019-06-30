import React, { useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary'
import Board from './Board'
import { currentStatus, isGameOver } from './calculateWinner'
import { Themes, ThemeContext } from './ThemeContext'
import ThemeSwitcher from './ThemeSwitcher'
import LogDirectionSwitcher from './LogDirectionSwitcher'
import WinnerModal from './WinnerModal';
import MovesList from './MovesList';
import { connect } from 'react-redux'
import { hackCrossThemeStyle } from './hacks'

function Game(props) {
  useEffect(() => { document.getElementById('root').style.background = Themes.classFor(props.theme); }, [props.theme]);

  return (
    <ErrorBoundary>
      <ThemeContext.Provider value={props.theme}>
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div style={hackCrossThemeStyle}>{props.status}</div>
            <LogDirectionSwitcher />
            <ThemeSwitcher />
            <MovesList />
          </div>
          {props.shouldShowEndWindow &&
            <WinnerModal />}
        </div>
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
}

function mapStateToProps(state) {
  const actualBoard = state.history[state.stepNumber];
  const [status] = currentStatus(actualBoard);
  const shouldShowEndWindow = isGameOver(actualBoard) && !state.gameState.ack;
  
  return {
    theme: state.theme,
    status,
    shouldShowEndWindow
  };
}

export default connect(mapStateToProps)(Game);