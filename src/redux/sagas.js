/* eslint-disable no-unused-vars */
import { all } from "redux-saga/effects";
import authSagas from "./auth/saga";
import cartSagas from "./cart/saga";

export default function* rootSaga(getState) {
  yield all([authSagas(), cartSagas()]);
}
