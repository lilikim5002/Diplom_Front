import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './account/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Перенаправление на главную страницу по умолчанию
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) },
  { path: 'basket', loadChildren: () => import('./basket/basket.module').then(m => m.BasketModule) },
  { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
  { path: 'test-error', component: TestErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'Ⓑ', redirectTo: 'not-found', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
