import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { HistoryComponent } from './pages/history/history.component';
import { NewItemComponent } from './pages/new-item/new-item.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MyCartPageComponent } from './pages/my-cart-page/my-cart-page.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { IsSignInGuard } from './is-sign-in.guard';
import { isAdminGuard } from './is-mannager.guard';

const routes: Routes = [
  {path: 'shop-page', component: ShopPageComponent,
  canActivate : [IsSignInGuard]},
  {path: 'sign-in', component: SignInComponent},
  {path: 'history-page', component: HistoryComponent,
  canActivate : [IsSignInGuard]},
  {path: 'newItem-page', component: NewItemComponent,
  canActivate : [IsSignInGuard, isAdminGuard]},
  {path: 'main-page', component: MainPageComponent,
  canActivate : [IsSignInGuard]},
  {path: 'my-cart-page',  component: MyCartPageComponent,
  canActivate : [IsSignInGuard]},
  {path: '', redirectTo: 'sign-in', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
