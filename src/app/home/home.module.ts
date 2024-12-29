import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ShopModule } from '../shop/shop.module';
import { ProductItemComponent } from '../shop/product-item/product-item.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopModule
  ],
  exports: [
    HomeComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }
