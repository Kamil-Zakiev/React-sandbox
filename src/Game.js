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

const appRoot = document.getElementById('root');

function Game(props) {
    const current = props.history[props.stepNumber];
    const [status, winDirection] = currentStatus(current);

    useEffect(() => { document.title = status; }, [status]);
    useEffect(() => { appRoot.style.background = Themes.classFor(props.theme); }, [props.theme]);

    const hackCrossThemeStyle = {
        color: 'green'
    };

    const game = (
        <div className="game">
            <div className="game-board">
                <Board winDirection={winDirection} />
            </div>
            <div className="game-info">
                <div style={hackCrossThemeStyle}>{status}</div>
                <LogDirectionSwitcher />
                <ThemeSwitcher />
                <MovesList />
            </div>
            {isGameOver(status) && props.allowModal &&
                <WinnerModal status={status} />}
        </div>
    );

    return (
        <ErrorBoundary>
            <ThemeContext.Provider value={props.theme}>
                {game}
            </ThemeContext.Provider>
        </ErrorBoundary>
    );
}

function mapStateToProps(state) {
    return {
        history: state.history,
        stepNumber: state.stepNumber,
        allowModal: state.allowModal,
    };
}

export default connect(mapStateToProps)(Game);