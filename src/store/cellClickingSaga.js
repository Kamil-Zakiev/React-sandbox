import { call, put, takeEvery, race, take, delay, select } from 'redux-saga/effects'
import { CLICK_CELL } from './actions';

function* clickCell(action) {
    yield call(apiSendRequest, action);
    yield put({ type: "CELL_PRESSED" });
}

export function* opponentHasPressed() {
    let opponentClick = yield take(CLICK_CELL);
    while (true) {
        const { clicked } = yield race({
            clicked: take(CLICK_CELL),
            timeout: delay(5000)
        });

        if (!clicked) {
            const opponent = yield select(s => s.history[s.stepNumber].squares[opponentClick.cell]);
            console.log('timeout loose, ', opponent, ' has won!');
            break;
        } else {
            opponentClick = clicked;
        }
    }
}

export function* cellClickingSaga() {
    yield takeEvery(CLICK_CELL, clickCell);
}

function apiSendRequest(action) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('clicked, ', action);
            resolve();
        }, 500);
    });
}