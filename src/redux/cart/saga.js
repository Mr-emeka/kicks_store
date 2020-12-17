import { all, fork, takeLatest, put } from 'redux-saga/effects';
import { SIGN_OUT } from '../actions';
import { clearCart } from './actions';

export function* clearCartOnSignOut() {
  yield put(clearCart());
}
export function* watchSignOutSuccess() {
  yield takeLatest(SIGN_OUT, clearCartOnSignOut);
}
export default function* cartSagas() {
  yield all([fork(watchSignOutSuccess)]);
}
