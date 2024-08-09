import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product } from '../../../model/product.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/product.reducer';
import { cartProductList } from '../../../store/product.selectors';
import {  addToCartAction, addToQuantity, minusQuantity, removeFromFinalCartAction } from '../../../store/product.action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  quantity$!: Observable<any>;
  cartList$! : Observable<Product[]>;
  constructor(private store: Store<AppState>){

  }

  ngOnInit(): void {

    this.cartList$ = this.store.select(cartProductList).pipe();


  }

  deleteFromCart(cartItem : Product){
    this.store.dispatch(removeFromFinalCartAction({productid: cartItem.id, productLevel: cartItem.productLevel}));
  }
  addToQuantity(item: Product){

    this.store.dispatch(addToQuantity({productid: item.id, productLevel: item.productLevel}));


  }
  minusTheQuantity(item: Product){
    if(item.quantity > 1){
      this.store.dispatch(minusQuantity({productid: item.id, productLevel: item.productLevel}))
    }else{
      this.store.dispatch(removeFromFinalCartAction({productid: item.id, productLevel: item.productLevel}));
    }

  }
}
