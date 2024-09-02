import { createSelector } from "@ngrx/store";
import { AppState } from "./product.reducer";

export const productStore = (state: any) => state.productt;

export const productList = createSelector(productStore, (app: AppState) => app.product);
export const cartProductList = createSelector(productStore, (app: AppState) => app.cart);
export const productTotalPrices = createSelector(productStore, (app: AppState) => app.totalPrice);

