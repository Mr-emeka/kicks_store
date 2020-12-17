import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  SIGN_OUT,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR,
  SET_CURRENT_USER,
  GOOGLE_SIGN_IN,
  USER_SESSION,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_ERROR,
} from '../actions';

export const uploadImage = (image) => ({
  type: UPLOAD_IMAGE,
  payload: { image },
});

export const uploadImageSuccess = (image) => ({
  type: UPLOAD_IMAGE_SUCCESS,
  payload: image,
});

export const uploadImageError = (message) => ({
  type: UPLOAD_IMAGE_ERROR,
  payload: { message },
});

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const userSession = () => ({
  type: USER_SESSION,
});

export const googleSignInStart = () => ({
  type: GOOGLE_SIGN_IN,
});

export const loginUserSuccess = (user, docs) => ({
  type: LOGIN_USER_SUCCESS,
  payload: { ...user, docs },
});

export const loginUserError = (message) => ({
  type: LOGIN_USER_ERROR,
  payload: { message },
});

export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user,
});

export const forgotPassword = (forgotUserMail, history) => ({
  type: FORGOT_PASSWORD,
  payload: { forgotUserMail, history },
});
export const forgotPasswordSuccess = (forgotUserMail) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: forgotUserMail,
});
export const forgotPasswordError = (message) => ({
  type: FORGOT_PASSWORD_ERROR,
  payload: { message },
});

export const resetPassword = ({
  resetPasswordToken,
  resetPasswordCode,
  newPassword,
  history,
}) => ({
  type: RESET_PASSWORD,
  payload: { resetPasswordToken, resetPasswordCode, newPassword, history },
});
export const resetPasswordSuccess = (newPassword) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: newPassword,
});
export const resetPasswordError = (message) => ({
  type: RESET_PASSWORD_ERROR,
  payload: { message },
});

export const registerUser = (user) => ({
  type: REGISTER_USER,
  payload: user,
});
export const registerUserSuccess = (user, additionalData) => ({
  type: REGISTER_USER_SUCCESS,
  payload: { user, additionalData },
});
export const registerUserError = (message) => ({
  type: REGISTER_USER_ERROR,
  payload: { message },
});
export const logoutUser = (history) => ({
  type: SIGN_OUT,
  payload: { history },
});
export const logoutUserSuccess = () => ({
  type: SIGN_OUT_SUCCESS,
});
export const logoutUserFailure = (error) => ({
  type: SIGN_OUT_ERROR,
  payload: error,
});
