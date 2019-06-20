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
import * as actionCreators from './store/actionCreators'

const appRoot = document.getElementById('root');

function mapStateToProps(state) {
    return {
        history: state.history,
        stepNumber: state.stepNumber,
        isAsc: state.isAsc,
        theme: state.theme,
        allowModal: state.allowModal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onCellClick: (i) => dispatch(actionCreators.ClickCell(i)),
        onChangeTheme: () => dispatch(actionCreators.ChangeTheme()),
        onChangeLogDirection: () => dispatch(actionCreators.ChangeLogDirection()),
        onMoveToStep: (step) => dispatch(actionCreators.MoveToStep(step)),
        onSetAllowModal: () => dispatch(actionCreators.SetAllowModal(false))
    };
}

function Game(props) {
    const current = props.history[props.stepNumber];
    const [status, winDirection] = currentStatus(current);

    useEffect(() => { document.title = status; }, [status]);
    useEffect(() => { appRoot.style.background = Themes.classFor(props.theme); }, [props.theme]);

    return (
        <ThemeContext.Provider value={props.theme}>
            <div className="game">
                <div className="game-board">
                    <ErrorBoundary>
                        <Board
                            squares={current.squares}
                            xIsNext={current.xIsNext}
                            winDirection={winDirection}
                            onClick={props.onCellClick}
                        />
                    </ErrorBoundary>
                </div>
                <div className="game-info">
                    <div style={{ color: 'green' }}>{status}</div>
                    <LogDirectionSwitcher
                        onClick={props.onChangeLogDirection}
                        isAsc={props.isAsc}
                    />
                    <ThemeSwitcher
                        onClick={props.onChangeTheme}
                    />
                    <MovesList
                        history={props.history}
                        isAsc={props.isAsc}
                        stepNumber={props.stepNumber}
                        onStepClick={props.onMoveToStep}
                    />
                </div>
                {isGameOver(status) && props.allowModal &&
                    <WinnerModal
                        status={status}
                        onClick={props.onSetAllowModal}
                    />}
            </div>
        </ThemeContext.Provider>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);