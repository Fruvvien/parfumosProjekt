import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ProfileComponent } from './header/profiles/profile/profile.component';
import { CardsComponent } from './header/products/cards/cards.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CheapProductsComponent } from './header/products/smallCards/cheap-products/cheap-products.component';
import { SidenavComponentComponent } from './header/sidenavContent/sidenav-component/sidenav-component.component';
import {MatListModule} from '@angular/material/list';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import { DetailsComponent } from './header/details/details.component';
import { productReducer } from './store/product.reducer';
import { StoreModule } from '@ngrx/store';
import { CartComponent } from './header/cart/cart/cart.component';
import { SuccessfulPaymentDialogComponent } from './header/successful-payment-dialog/successful-payment-dialog.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    CardsComponent,
    CheapProductsComponent,
    SidenavComponentComponent,
    DetailsComponent,
    CartComponent,
    SuccessfulPaymentDialogComponent,



  ],
  imports: [
    AppRoutingModule,
    MatToolbarModule,
    BrowserModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatListModule,
    HttpClientModule,
    MatDialogModule,
    StoreModule.forRoot({productt: productReducer}),
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
