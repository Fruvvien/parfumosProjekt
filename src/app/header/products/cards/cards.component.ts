import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '../../details/details.component';
import { fetchDataService } from '../../../fetchData/fetchDataService';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/product.reducer';
import { cartProductList, productList } from '../../../store/product.selectors';
import { addToCartAction, addToQuantity, loadProducts, minusQuantity } from '../../../store/product.action';
import { Product } from '../../../model/product.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit{
  productList$! : Observable<Product[]>;
  cartList$! : Observable<Product[]>;
  products : any;
  getGender : string

  constructor(private prdouctServices: fetchDataService ,  private route: ActivatedRoute, private dialog: MatDialog, private store: Store<AppState>){

  }

  ngOnInit(): void {
    this.storageFetchedDatas();
    this.productList$ =  this.store.select(productList);

    this.store.dispatch(loadProducts({productList: this.products}));

    this.route.params.subscribe(
      (params :Params) =>{
        this.getGender = params['id'];
      }
    )


  }


  storageFetchedDatas(){
    this.prdouctServices.fetchDataFinalProduct().subscribe(
      res =>{
        this.products = res
      }
    )
  }

  openDialog(id: number){

    this.dialog.open(DetailsComponent, {
      width: '600px',
      height: '600px',
      data: {
        id: id,
        name: "FinalProduct"
      }

    });


  }

  addToCart(item: Product){

    if(item.quantity === undefined ){
      item.productLevel = "FinalProduct";
      item = {
        ...item, quantity: item.quantity = 1   //az ngrx-ben gyakori az immutable állapotkezelés, ami megköveteli, hogy új objektumokat hozz létre aa módosításokkal.
      }
      this.store.dispatch(addToCartAction({productItem: item}))

    }
    else{
      this.store.dispatch(addToQuantity({productid: item.id, productLevel: item.productLevel}))
    }





  }




}
