import { createReducer, on } from "@ngrx/store";
import { Product } from "../model/product.model";
import { addToCartAction,  addToQuantity,  loadProducts, minusQuantity, removeFromFinalCartAction } from "./product.action";

export interface AppState{
  product: Product[];
  cart: Product[];
}

const initialState: AppState = {
  product: [],
  cart: [],
}

export const productReducer = createReducer(initialState,
  on(loadProducts, (state, {productList}) => ({...state, product: productList})),
  on(addToCartAction, (state, {productItem}) => {
    const findCartItem = state.cart?.find(item => item.id === productItem.id && item.productLevel === item.productLevel); //itt keressük meg, hogy létezik-e a termék a kosárban

    let newCart
    if(findCartItem){
      newCart = state.cart?.map(
        prod =>{
          if(prod.id === productItem.id  && prod.productLevel === productItem.productLevel ){
            return {...prod, quantity: prod.quantity + 1 };
          }else{
            return prod;
          }
        }

      )
    }else{
      newCart = [
        ...( state.cart || []), //Ez a kifejezés arra szolgál, hogy biztosítsa, hogy a state.cart mindig egy tömb legyen, még akkor is, ha kezdetben undefined vagy null.
       {...productItem}];
    }

    const newState = {
      ...state,
      cart: newCart,
    };
    return newState;

  })

  /* ({...state, cart: [...state.cart, productItem]})), */,
  on(removeFromFinalCartAction, (state, {productid , productLevel}) => ({...state, cart: state.cart.filter(v =>  v.id !== productid || v.productLevel !== productLevel )})),
  on(addToQuantity, (state, {productid, productLevel}) =>
    {
      const newState = {
      ...state,
      cart: state.cart?.map(
        prod => {

          if(prod.id === productid  && prod.productLevel === productLevel ){
            return {...prod, quantity: prod.quantity + 1 };
          }else{
            return prod;
          }
        })
      };

      console.log('new state:', newState)
      return newState
    }
  ),
  on(minusQuantity, (state, {productid, productLevel}) =>
    {
      const newState = {
      ...state,
      cart: state.cart?.map(prod => {

          if(prod.id === productid  && prod.productLevel === productLevel ){
            return {...prod, quantity: prod.quantity - 1 };
          }else{
            return prod;
          }
        })
      };

      console.log('new state:', newState)
      return newState
    }
  )




);
