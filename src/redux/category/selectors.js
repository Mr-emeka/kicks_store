import { createSelector } from 'reselect';

const selectCategory = (state) => state.category;
export const selectCategorySections = createSelector(
  [selectCategory],
  (category) => category.sections
);
