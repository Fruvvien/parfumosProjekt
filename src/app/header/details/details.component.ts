import { Component,  inject,  Inject,  OnInit } from '@angular/core';
import { fetchDataService } from '../../fetchData/fetchDataService';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardsComponent } from '../products/cards/cards.component';
import { CheapProductsComponent } from '../products/smallCards/cheap-products/cheap-products.component';
import { Product } from '../../model/product.model';
import { addToCartAction, sumPrice } from '../../store/product.action';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/product.reducer';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  finalproduct : any;
  simpleproduct: any;
  productName: string;
  products: any;
  dialogToFinalProduct = inject(MatDialogRef<CardsComponent>);
  dialogToSimpleProduct = inject(MatDialogRef<CheapProductsComponent>);

  constructor(private fetchdataservice: fetchDataService,   @Inject(MAT_DIALOG_DATA) protected data: {id: number, name: string}, private store: Store<AppState>){

  }

  ngOnInit(): void {
    this.productName  = this.data.name

    if( this.productName == "FinalProduct"){
      this.storageFinalProductFetchedDatas();
    }
    if( this.productName == "SimpleProduct"){
      this.storageSimpleProductFetchedDatas();
    }


  }


  storageFinalProductFetchedDatas(){
    this.fetchdataservice.fetchDataFinalProduct().subscribe(
      res =>{
        this.products = res;
      }
    )
  }
  storageSimpleProductFetchedDatas(){
    this.fetchdataservice.fetchDataSimpleProduct().subscribe(
      res =>{
        this.products = res;
      }
    )
  }
  onNoClick(): void {
    if( this.productName == "FinalProduct"){
      this.dialogToFinalProduct.close();
    }
    if( this.productName == "SimpleProduct"){
      this.dialogToSimpleProduct.close();

    }
  }

  addToCart(item: Product){

    if( this.productName == "FinalProduct"){
      item.productLevel = "FinalProduct";
      item = {
        ...item, quantity: item.quantity = 1   //az ngrx-ben gyakori az immutable állapotkezelés, ami megköveteli, hogy új objektumokat hozz létre aa módosításokkal.
      }
      this.store.dispatch(addToCartAction({productItem: item}));
      this.store.dispatch(sumPrice({price: item.price}));
      this.dialogToFinalProduct.close();
    }
    if( this.productName == "SimpleProduct"){
      item.productLevel = "SimpleProduct";
      item = {
        ...item, quantity: item.quantity = 1   //az ngrx-ben gyakori az immutable állapotkezelés, ami megköveteli, hogy új objektumokat hozz létre aa módosításokkal.
      }
      this.store.dispatch(addToCartAction({productItem: item }));
      this.store.dispatch(sumPrice({price: item.price}));
      this.dialogToSimpleProduct.close();
    }

  }

}
