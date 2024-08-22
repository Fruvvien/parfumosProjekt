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
  cartQuantityNumber : number ;
  cartList$! : Observable<Product[]>;

  constructor( private store: Store<AppState>){

  }


  ngOnInit(): void {

    this.cartList$ =  this.store.select(cartProductList).pipe( );
    this.cartList$.subscribe(v =>{
      v.map( c =>  this.cartQuantityNumber =+ c.quantity )
    })

  }



}
