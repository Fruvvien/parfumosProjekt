import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './header/products/cards/cards.component';
import { ProfileComponent } from './header/profiles/profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './header/cart/cart/cart.component';

const routes: Routes = [
  {path:'', redirectTo: 'product', pathMatch: 'full'},
  {path:'product', component:CardsComponent},
  {path:'product/:id', component: CardsComponent},

  {path:'profile', component: ProfileComponent},
  {path:'cart', component: CartComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
