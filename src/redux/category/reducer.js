import {
  FETCH_CATEGORY,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_ERROR,
  TOGGLE_CATEGORY_MODAL,
  CREATE_CATEGORY,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_ERROR,
} from '../actions';

const INITIAL_STATE = {
  sections: [],
  loading: false,
  showEditModal: false,
  error: '',
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CATEGORY:
      return { ...state, loading: true, sections: [] };
    case FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        sections: action.payload,
        loading: false,
      };
    case CREATE_CATEGORY:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_CATEGORY_SUCCESS:
      return { ...state, loading: false };
    case TOGGLE_CATEGORY_MODAL:
      return {
        ...state,
        showEditModal: action.payload,
      };
    case FETCH_CATEGORY_ERROR:
    case CREATE_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default categoryReducer;
