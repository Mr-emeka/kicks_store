import {
  FETCH_PRODUCT,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_ERROR,
  TOGGLE_PRODUCT_MODAL,
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
} from '../actions';

const INITIAL_STATE = {
  products: [],
  loading: false,
  errorMessage: undefined,
  showEditModal: false,
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCT:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_PRODUCT_SUCCESS:
      return { ...state, loading: false };
    case FETCH_PRODUCT_ERROR:
    case CREATE_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case TOGGLE_PRODUCT_MODAL:
      return {
        ...state,
        showEditModal: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
