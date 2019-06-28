import { call, put, takeEvery } from 'redux-saga/effects'
import { CLICK_CELL } from './actions';

function* clickCell(action) {
    yield call(apiSendRequest, action);
    yield put({ type: "CELL_PRESSED" });
}

export default function* cellClickingSaga() {
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