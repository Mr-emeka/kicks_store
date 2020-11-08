import { createSelector } from "reselect";

const selectUser = (state) => state.authUser;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);
