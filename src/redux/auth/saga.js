import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  LOGIN_USER,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  SIGN_OUT,
  FORGOT_PASSWORD,
  USER_SESSION,
  RESET_PASSWORD,
  GOOGLE_SIGN_IN,
} from '../actions';
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
  isAdmin,
} from '../../helpers/Firebase.ts';
import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
  logoutUserFailure,
  logoutUserSuccess,
} from './actions';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();
    yield put(
      loginUserSuccess({
        uid: userSnapshot.id,
        ...userSnapshot.data(),
      })
    );
  } catch (error) {
    yield put(loginUserError(error));
  }
}

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (email, password) => {
  const user = await auth.signInWithEmailAndPassword(email, password);
  return user;
};

function* loginWithEmailPassword({ payload: { email, password, history } }) {
  try {
    const loggedInUser = yield call(
      loginWithEmailPasswordAsync,
      email,
      password
    );
    console.log('logged in user', loggedInUser);
    const { uid } = loggedInUser.user;
    const userIsAdmin = yield isAdmin(uid);
    if (userIsAdmin.isAdmin) {
      history.push(`/admin/dash`);
      yield put(loginUserSuccess(loggedInUser, userIsAdmin));
      return;
    }
    history.push(`/`);
    yield put(loginUserSuccess(loggedInUser, userIsAdmin));
  } catch (error) {
    yield put(loginUserError(error.message));
  }
}

export function* watchSignInWithGoogle() {
  yield takeEvery(GOOGLE_SIGN_IN, signInWithGoogle);
}
const googleSignIn = async () => {
  const { user } = await auth.signInWithPopup(googleProvider);
  return user;
};
function* signInWithGoogle() {
  try {
    const user = yield call(googleSignIn);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(loginUserError(error.message));
  }
}
export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, register);
}

const registerAsync = async ({ email, password }) => {
  const { user } = await auth.createUserWithEmailAndPassword(email, password);
  return user;
};

function* register({ payload: { displayName, email, password, history } }) {
  try {
    const user = yield call(registerAsync, { email, password });
    yield put(registerUserSuccess(user, { displayName }));
    history.push('/');
  } catch (error) {
    yield put(registerUserError(error.message));
  }
}

export function* watchSignInAfterRegister() {
  yield takeEvery(REGISTER_USER_SUCCESS, signInAfterRegister);
}

function* signInAfterRegister({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* watchLogoutUser() {
  yield takeEvery(SIGN_OUT, logout);
}

const logoutAsync = async (history) => {
  // history.push(adminRoot);
};

function* logout({ payload }) {
  try {
    const { history } = payload;
    yield auth.signOut();
    yield call(logoutAsync, history);
    yield put(logoutUserSuccess());
  } catch (error) {
    yield put(logoutUserFailure(error.message));
  }
}

export function* watchIsUserAuthenticated() {
  yield takeEvery(USER_SESSION, isUserAuthenticated);
}
export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(loginUserError(error.message));
  }
}

// export function* watchForgotPassword() {
//   yield takeEvery(FORGOT_PASSWORD, forgotPassword);
// }

// const forgotPasswordAsync = async (email) => {
//   return await api
//     .post(
//       `users/admin/reset_password/`,
//       { email },
//       { headers: { "Content-Type": "application/json" } }
//     )
//     .then((user) => user)
//     .catch((error) => {
//       if (error.response.data) {
//         console.log(error.response);
//         return error.response;
//       }
//       console.log(error);
//       return error;
//     });
// };

// function* forgotPassword({ payload }) {
//   const { email } = payload.forgotUserMail;
//   try {
//     const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
//     if (forgotPasswordStatus.status === 204) {
//       yield put(forgotPasswordSuccess("success"));
//     } else {
//       yield put(forgotPasswordError(forgotPasswordStatus.data.error_msg));
//     }
//   } catch (error) {
//     yield put(forgotPasswordError(error));
//   }
// }

// export function* watchResetPassword() {
//   yield takeEvery(RESET_PASSWORD, resetPassword);
// }

// const resetPasswordAsync = async (
//   newPassword,
//   resetPasswordToken,
//   resetPasswordCode
// ) =>
//   await api
//     .post(
//       `users/admin/reset_password_confirm/`,
//       {
//         uid: resetPasswordCode,
//         token: resetPasswordToken,
//         new_password: newPassword,
//       },
//       { header: { "Content-Type": "application/json" } }
//     )
//     .then((user) => user)
//     .catch((error) => {
//       if (error.response.data) {
//         console.log(error.response);
//         return error.response;
//       }
//       console.log(error);
//       return error;
//     });

// function* resetPassword({ payload }) {
//   const { newPassword, resetPasswordToken, resetPasswordCode } = payload;
//   console.log(payload);
//   try {
//     const resetPasswordStatus = yield call(
//       resetPasswordAsync,
//       newPassword,
//       resetPasswordToken,
//       resetPasswordCode
//     );
//     if (resetPasswordStatus.status === 200) {
//       yield put(resetPasswordSuccess("success"));
//     } else {
//       console.log(resetPasswordStatus);
//       yield put(resetPasswordError(resetPasswordStatus.data.token[0]));
//     }
//   } catch (error) {
//     yield put(resetPasswordError(error));
//   }
// }

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchIsUserAuthenticated),
    fork(watchSignInAfterRegister),
    // fork(watchForgotPassword),
    // fork(watchResetPassword),
  ]);
}
