import { Component, OnInit } from '@angular/core';
import {  map, Observable } from 'rxjs';
import { Product } from '../../../model/product.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/product.reducer';
import { cartProductList, productTotalPrices } from '../../../store/product.selectors';
import { addToQuantity, deleteAllProductsFromCart, minusPrice, minusQuantity, removeFromFinalCartAction, sumPrice } from '../../../store/product.action';

import { MatDialog } from '@angular/material/dialog';
import { SuccessfulPaymentDialogComponent } from '../../successful-payment-dialog/successful-payment-dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  fullPrice$ : Observable<number> ;
  totalPrice: string ;
  quantity$!: Observable<any>;
  cartList$! : Observable<Product[]>;
  isCartEmpty$ : Observable<boolean>;
  constructor(private store: Store<AppState>, private dialoge: MatDialog){

  }

  ngOnInit(): void {

    this.cartList$ = this.store.select(cartProductList).pipe();
    this.isCartEmpty$ = this.cartList$.pipe(
      map(cartList => cartList.length === 0)
    );
    this.fullPrice$ = this.store.select(productTotalPrices).pipe();
    this.fullPrice$.subscribe(v =>
      this.totalPrice = v.toString()
    )


  }

  onMouse(){
    this.totalPrice = "Pay";
  }
  offMouse(){
    this.fullPrice$.subscribe(v =>
      this.totalPrice = v.toString()
    )
  }


  deleteFromCart(cartItem : Product){
    this.store.dispatch(minusPrice({price: cartItem.price}));
    this.store.dispatch(removeFromFinalCartAction({productid: cartItem.id, productLevel: cartItem.productLevel}));
  }
  addToQuantity(item: Product){

    this.store.dispatch(addToQuantity({productid: item.id, productLevel: item.productLevel}));

    this.store.dispatch(sumPrice({price: item.price}));


  }
  minusTheQuantity(item: Product){
    if(item.quantity > 1){
      this.store.dispatch(minusPrice({price: item.price}));
      this.store.dispatch(minusQuantity({productid: item.id, productLevel: item.productLevel}))

    }else{
      this.store.dispatch(minusPrice({price: item.price}));
      this.store.dispatch(removeFromFinalCartAction({productid: item.id, productLevel: item.productLevel}));
    }

  }
  payMethod(){
      this.dialoge.open(SuccessfulPaymentDialogComponent,
        {
          width: '650px',
          height: '520px',

        }
      )



  }
}
