import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { CREATE_PRODUCT, FETCH_PRODUCT } from '../actions';
import {
  db,
  convertCollectionSnapshotToMap,
  addProduct,
} from '../../helpers/Firebase.ts';
import {
  createProductSuccess,
  createProductError,
  fetchProductError,
  fetchProductSuccess,
} from './actions';

// const wait = (ms) => new Promise((res) => setTimeout(res, ms));

const createProductAsync = async (id, newProduct) => {
  addProduct(id, newProduct);
  return true;
};

function* createProduct({ payload: { id, newProduct } }) {
  try {
    // yield wait(1000)
    newProduct.price = Number(newProduct.price);
    yield call(createProductAsync, id, newProduct);
    yield put(createProductSuccess());
  } catch (error) {
    yield put(createProductError(error.message));
  }
}
export function* watchCreateProduct() {
  yield takeLatest(CREATE_PRODUCT, createProduct);
}

function* fetchProduct({ payload: { categoryId } }) {
  try {
    const collectionRef = db
      .collection('products')
      .where('categoryId', '==', categoryId);
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);
    yield put(fetchProductSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchProductError(error.message));
  }
}

export function* watchFetchProduct() {
  yield takeLatest(FETCH_PRODUCT, fetchProduct);
}

export default function* rootSaga() {
  yield all([fork(watchCreateProduct), fork(watchFetchProduct)]);
}
