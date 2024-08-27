import { createAction, props } from "@ngrx/store";
import { Product } from "../model/product.model";

export const loadProducts = createAction('[PRODUCT] load product', props<{productList}>());
export const addToCartAction = createAction('[PRODUCT] add product', props<{productItem: Product}>());
export const removeFromFinalCartAction = createAction('[PRODUCT] remove product', props<{productid: number, productLevel: string}>());
export const addToQuantity = createAction('[PRODUCT] add to quantity', props <{ productid: number, productLevel: string}>());
export const minusQuantity = createAction('[PRODUCT] minus quantity', props <{ productid: number, productLevel: string}>())
export const deleteAllProductsFromCart = createAction('[PRODUCT] delete products');


