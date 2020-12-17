import { createSelector } from 'reselect';

const selectProduct = (state) => state.product;

export const selectCollections = createSelector(
  [selectProduct],
  (product) => product.products
);

export const selectCollectionForPreview = createSelector(
  [selectCollections],
  (products) =>
    products ? Object.keys(products).map((key) => products[key]) : []
);

export const selectCollection = (productUrlParam) =>
  createSelector([selectCollections], (products) =>
    products ? products[productUrlParam] : null
  );

export const selectIsCollectionFetching = createSelector(
  [selectProduct],
  (product) => product.loading
);

export const selectIsProducLoaded = createSelector(
  [selectProduct],
  (product) => !!product.products
);
