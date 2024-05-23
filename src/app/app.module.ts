import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatExpansionModule} from '@angular/material/expansion'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { HistoryComponent } from './pages/history/history.component';
import { NewItemComponent } from './pages/new-item/new-item.component';
import { FilterComponent } from './components/price-filter/price-filter.component';
import { MatSliderModule} from '@angular/material/slider';
import { ShoeCardComponent } from './components/shoe-card/shoe-card.component';
import { ShopContainerComponent } from './components/shop-container/shop-container.component';
import { SizeComponent } from './components/size/size.component';
import { MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { BrandFilterComponent } from './components/brand-filter/brand-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyCartPageComponent } from './pages/my-cart-page/my-cart-page.component';
import { TopPicksComponent } from './components/top-picks/top-picks.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from  '@angular/material/input';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { RatingComponent } from './components/rating/rating.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PurchasedItemComponent } from './components/purchased-item/purchased-item.component';
import { GraphQLModule} from '../app/graphql.module';


@NgModule({
  declarations: [
    AppComponent,
    ShopPageComponent,
    MainPageComponent,
    HistoryComponent,
    NewItemComponent,
    FilterComponent,
    ShoeCardComponent,
    ShopContainerComponent,
    SizeComponent,
    BrandFilterComponent,
    MyCartPageComponent,
    TopPicksComponent,
    SignInComponent,
    RatingComponent,
    DialogComponent,
    PurchasedItemComponent,
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatExpansionModule,
    GraphQLModule,
    MatSelectModule,
    FormsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatInputModule,
    SimpleNotificationsModule.forRoot(),
  ],
  providers: [MatDialogModule],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent],
  exports: [MatDialogModule]
})
export class AppModule { }
