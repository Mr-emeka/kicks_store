import {
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  FETCH_PRODUCT,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_ERROR,
  TOGGLE_PRODUCT_MODAL,
} from '../actions';

export const fetchProduct = (categoryId) => ({
  type: FETCH_PRODUCT,
  payload: { categoryId },
});
export const fetchProductSuccess = (collectionsMap) => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload: collectionsMap,
});
export const fetchProductError = (errorMessage) => ({
  type: FETCH_PRODUCT_ERROR,
  payload: errorMessage,
});

export const createProduct = (id, newProduct) => ({
  type: CREATE_PRODUCT,
  payload: { id, newProduct },
});
export const createProductSuccess = () => ({
  type: CREATE_PRODUCT_SUCCESS,
});
export const createProductError = (errorMessage) => ({
  type: CREATE_PRODUCT_ERROR,
  payload: errorMessage,
});
export const toggleProductModal = (value) => ({
  type: TOGGLE_PRODUCT_MODAL,
  payload: value,
});
