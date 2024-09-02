import { createReducer, on } from "@ngrx/store";
import { Product } from "../model/product.model";
import { addToCartAction,  addToQuantity,
  deleteAllProductsFromCart,
  loadProducts, minusPrice, minusQuantity, removeFromFinalCartAction,
  sumPrice} from "./product.action";

export interface AppState{
  product: Product[];
  cart: Product[];
  totalPrice: number;
}

const initialState: AppState = {
  product: [],
  cart: [],
  totalPrice: 0,
}

export const productReducer = createReducer(initialState,
  on(loadProducts, (state, {productList}) => ({...state, product: productList})),
  on(addToCartAction, (state, {productItem}) => {
    const findCartItem = state.cart?.find(item => item.id === productItem.id && item.productLevel === productItem.productLevel ); //itt keressük meg, hogy létezik-e a termék a kosárban
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
      return newState
    }
  ),

  on(deleteAllProductsFromCart, (state)=> ({...state, cart: [], totalPrice: 0 })),
  on(sumPrice,(state, {price}) =>{

      return{
        ...state,
        totalPrice: state.totalPrice + price

      }
  } ),
  on(minusPrice,(state, {price}) =>{

    return{
      ...state,
      totalPrice: state.totalPrice - price

    }
} )




);
