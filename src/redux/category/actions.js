import {
  FETCH_CATEGORY,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_ERROR,
  TOGGLE_CATEGORY_MODAL,
  CREATE_CATEGORY,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_ERROR,
} from '../actions';

export const fetchCategory = () => ({
  type: FETCH_CATEGORY,
});
export const fetchCategorySuccess = (collectionsMap) => ({
  type: FETCH_CATEGORY_SUCCESS,
  payload: collectionsMap,
});
export const fetchCategoryError = (errorMessage) => ({
  type: FETCH_CATEGORY_ERROR,
  payload: errorMessage,
});

export const toggleCatgoryModal = (value) => ({
  type: TOGGLE_CATEGORY_MODAL,
  payload: value,
});

export const createCategory = (newCategory) => ({
  type: CREATE_CATEGORY,
  payload: { newCategory },
});

export const createCategorySuccess = () => ({
  type: CREATE_CATEGORY_SUCCESS,
});

export const createCategoryError = (message) => ({
  type: CREATE_CATEGORY_ERROR,
  payload: message,
});
