import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { CREATE_CATEGORY, FETCH_CATEGORY } from '../actions';
import {
  addCollectionAndDocument,
  db,
  convertCategorySnapshotToMap,
} from '../../helpers/Firebase.ts';
import {
  createCategorySuccess,
  createCategoryError,
  fetchCategoryError,
  fetchCategorySuccess,
} from './actions';

// const wait = (ms) => new Promise((res) => setTimeout(res, ms));

const createCategoryAsync = async (newCategory) => {
  addCollectionAndDocument('category', newCategory);
  return true;
};

function* createCategory({ payload: { newCategory } }) {
  try {
    // yield wait(1000)
    yield call(createCategoryAsync, newCategory);
    yield put(createCategorySuccess());
  } catch (error) {
    yield put(createCategoryError(error.message));
  }
}
export function* watchCreateCategory() {
  yield takeLatest(CREATE_CATEGORY, createCategory);
}

function* fetchCategory() {
  try {
    const collectionRef = db.collection('category');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCategorySnapshotToMap, snapshot);
    yield put(fetchCategorySuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCategoryError(error.message));
  }
}

export function* watchFetchCategory() {
  yield takeLatest(FETCH_CATEGORY, fetchCategory);
}

export default function* rootSaga() {
  yield all([fork(watchCreateCategory), fork(watchFetchCategory)]);
}
