/* eslint-disable no-unused-vars */
import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import cartSagas from './cart/saga';
import categorySagas from './category/saga';
import productSagas from './product/saga';

export default function* rootSaga(getState) {
  yield all([authSagas(), cartSagas(), categorySagas(), productSagas()]);
}
