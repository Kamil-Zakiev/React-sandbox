import { call, put, take, select } from 'redux-saga/effects'
import { CLICK_CELL, MOVE_TO_STEP } from '../actionTypes';
import Api from '../../api';
import { isGameOver, currentStatus } from '../../calculateWinner';
import { CellPressed } from '../actionCreators';

import {currentBoardSelector} from '../selectors'

export default function* gameSaga() {
    while (true) {
        const clickCellAction = yield take(CLICK_CELL);
        const board = yield select(currentBoardSelector);
        if(isGameOver(board)){
            yield take(MOVE_TO_STEP);
            continue;
        }

        yield call(Api.sendCellClick, clickCellAction);
        yield put(CellPressed(clickCellAction.cell));

        const actualBoard = yield select(currentBoardSelector);

        const [status] = currentStatus(actualBoard);
        document.title = status;
    }
}