import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { BasketRoutingModule } from './basket-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../core/guards/auth.guard';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: BasketComponent, canActivate: [AuthGuard] }  // Защитите BasketComponent
];

@NgModule({
  declarations: [
    BasketComponent
  ],
  imports: [
    CommonModule,
    BasketRoutingModule,
    SharedModule
  ]
})
export class BasketModule { }
