import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppState } from '../../store/product.reducer';
import { Store } from '@ngrx/store';
import { deleteAllProductsFromCart } from '../../store/product.action';
import { cartProductList } from '../../store/product.selectors';
import { map, Observable } from 'rxjs';
import { CartComponent } from '../cart/cart/cart.component';


@Component({
  selector: 'app-successful-payment-dialog',
  templateUrl: './successful-payment-dialog.component.html',
  styleUrl: './successful-payment-dialog.component.scss'
})
export class SuccessfulPaymentDialogComponent {
  cardDatasIsTrue: boolean = false;
  cartList$! : Observable<any>;
  isTrue$ : Observable<boolean>;
  cart = inject(MatDialogRef<CartComponent>)
  constructor(private store: Store<AppState>){

  }

  cardDatas(){
    this.cardDatasIsTrue = true;
  }

  payment(){
    this.store.dispatch(deleteAllProductsFromCart());
    this.cartList$ = this.store.select(cartProductList).pipe();
    this.isTrue$ = this.cartList$.pipe(
      map(cartList => cartList.length === 0)
    );
    this.cardDatasIsTrue = false;
  }

  close(){
    this.cardDatasIsTrue = false;
    this.cart.close()
  }

  back(){
    this.cardDatasIsTrue = false;
  }

}
