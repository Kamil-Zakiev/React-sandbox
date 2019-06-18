import React, { useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary'
import Board from './Board'
import { calculateWinner, currentStatus, isGameOver } from './calculateWinner'
import { Themes, ThemeContext } from './ThemeContext'
import ThemeSwitcher from './ThemeSwitcher'
import LogDirectionSwitcher from './LogDirectionSwitcher'
import WinnerModal from './WinnerModal';
import MovesList from './MovesList';

const appRoot = document.getElementById('root');

export default function Game(props) {
    const [history, setHistory] = useState([{
        squares: Array(9).fill(null),
        xIsNext: true
    }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [isAsc, setIsAsc] = useState(true);
    const [theme, setTheme] = useState(Themes.ligth);
    const [allowModal, setAllowModal] = useState(false);

    const current = history[stepNumber];
    const [status, winDirection] = currentStatus(current);

    useEffect(() => { document.title = status; }, [status]);

    useEffect(() => { appRoot.style.background = Themes.classFor(theme); }, [theme]);

    function handleClick(i) {
        if (current.squares[i] || calculateWinner(current.squares)[0]) {
            return;
        }

        const squares = current.squares.slice();
        squares[i] = current.xIsNext ? 'X' : 'O';
        setHistory(history.slice(0, stepNumber + 1).concat({
            squares: squares,
            xIsNext: !current.xIsNext,
            cell: i
        }));
        setStepNumber(s => s + 1);
        setAllowModal(true);
    }

    return (
        <ThemeContext.Provider value={theme}>
            <div className="game">
                <div className="game-board">
                    <ErrorBoundary>
                        <Board
                            squares={current.squares}
                            xIsNext={current.xIsNext}
                            winDirection={winDirection}
                            onClick={handleClick}
                        />
                    </ErrorBoundary>
                </div>
                <div className="game-info">
                    <div style={{ color: 'green' }}>{status}</div>
                    <LogDirectionSwitcher
                        onClick={() => setIsAsc(!isAsc)}
                        isAsc={isAsc}
                    />
                    <ThemeSwitcher
                        onClick={() => setTheme(Themes.oppositeOf(theme))}
                    />
                    <MovesList
                        history={history}
                        isAsc={isAsc}
                        stepNumber={stepNumber}
                        onStepClick={(step) => setStepNumber(step)}
                    />
                </div>
                {isGameOver(status) && allowModal &&
                    <WinnerModal
                        status={status}
                        onClick={() => setAllowModal(false)}
                    />}
            </div>
        </ThemeContext.Provider>
    );
}
