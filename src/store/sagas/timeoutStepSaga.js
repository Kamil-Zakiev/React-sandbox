import { race, take, delay, select } from 'redux-saga/effects'
import { CLICK_CELL, CELL_PRESSED, MOVE_TO_STEP } from '../actionTypes';
import { isGameOver } from '../../calculateWinner';
import { currentBoardSelector, opponentSelector } from '../selectors'

export default function* timeoutStepSaga() {
    while (true) {
        yield take(CELL_PRESSED); // or MOVE_TO_STEP
        const board = yield select(currentBoardSelector);
        if (isGameOver(board)) {
            yield take(MOVE_TO_STEP);
        }

        let timeout, movedNext;
        // if a step is changed manually then restart a timeout. 
        // This is for redux-saga opportunities demonstration only.
        do {
            ({ timeout, movedNext } = yield race({
                clicked: take(CLICK_CELL),
                movedNext: take(MOVE_TO_STEP),
                timeout: delay(2000)
            }));
        } while (movedNext);

        if (timeout) {
            const opponent = yield select(opponentSelector);
            console.log('timeout loose, ', opponent, ' has won!');
        }
    }
}