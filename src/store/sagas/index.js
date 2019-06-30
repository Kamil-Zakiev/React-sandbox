import { all } from 'redux-saga/effects'
import gameSaga from './gameSaga'
import timeoutStepSaga from './timeoutStepSaga'

export default function* rootSaga() {
    yield all([
        gameSaga(),
        timeoutStepSaga()
    ]);
}