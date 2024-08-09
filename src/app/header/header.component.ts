import { Component, OnInit } from '@angular/core';
import { AppState } from '../store/product.reducer';
import { Store } from '@ngrx/store';
import { Product } from '../model/product.model';
import { Observable, tap } from 'rxjs';
import { cartProductList } from '../store/product.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',

})
export class HeaderComponent implements OnInit {
  cartItemCount = 0;
  cartList$! : Observable<Product[]>;

  constructor( private store: Store<AppState>){

  }


  ngOnInit(): void {

    this.cartList$ =  this.store.select(cartProductList).pipe(tap(v => this.cartItemCount =+ v.length));

  }



}
