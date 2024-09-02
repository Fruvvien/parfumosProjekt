import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '../../../details/details.component';
import { fetchDataService } from '../../../../fetchData/fetchDataService';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/product.reducer';
import { Observable } from 'rxjs';
import { Product } from '../../../../model/product.model';
import { productList } from '../../../../store/product.selectors';
import { addToCartAction, addToQuantity, sumPrice } from '../../../../store/product.action';

@Component({
  selector: 'app-cheap-products',
  templateUrl: './cheap-products.component.html',
  styleUrl: './cheap-products.component.scss'
})
export class CheapProductsComponent implements OnInit{
  products : any;
  getGender: string;
  productList$! : Observable<Product[]>;
  constructor(private cheapPrdouctServices: fetchDataService, private route: ActivatedRoute, private dialog: MatDialog,  private store: Store<AppState>){

  }


  ngOnInit(): void {
    this.storageFetchedDatas();
    this.productList$ =  this.store.select(productList);
    this.route.params.subscribe(
      (params :Params) =>{
        this.getGender = params['id'];
      }
    )
  }

  storageFetchedDatas(){
    this.cheapPrdouctServices.fetchDataSimpleProduct().subscribe(
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
        name: "SimpleProduct"
      }
    });

  }

  addToCart(item: Product){
    if(item.quantity === undefined ){
      item.productLevel = "SimpleProduct";
      item = {
        ...item, quantity: item.quantity = 1   //az ngrx-ben gyakori az immutable állapotkezelés, ami megköveteli, hogy új objektumokat hozz létre aa módosításokkal.
      }
      this.store.dispatch(addToCartAction({productItem: item}))
      this.store.dispatch(sumPrice({price: item.price}));


    }
    else{
      this.store.dispatch(addToQuantity({productid: item.id, productLevel: item.productLevel}));
      this.store.dispatch(sumPrice({price: item.price}));
    }
  }



}
