import { all, fork, takeLatest, put } from "redux-saga/effects";
import { SIGN_OUT_START } from "../actions";
import { clearCart } from "./actions";

export function* clearCartOnSignOut() {
  yield put(clearCart());
}
export function* watchSignOutSuccess() {
  yield takeLatest(SIGN_OUT_START, clearCartOnSignOut);
}
export default function* cartSagas() {
  yield all([fork(watchSignOutSuccess)]);
}
