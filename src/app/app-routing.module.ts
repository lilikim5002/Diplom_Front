import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './account/login/login.component'; 

const routes: Routes = [
  // Публичные маршруты (доступны всем)
  { path: 'home', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},

  // Защищенные маршруты (требуют авторизации)
  { 
    path: '', 
    children: [
      { path: 'home', component: HomeComponent,  data: { title: 'Главная'}},
      { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)},
      { path: 'basket', loadChildren: () => import('./basket/basket.module').then(m => m.BasketModule)},
      { path: 'checkout',  loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule)},
      { path: 'orders',  loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)}
    ]
  },

  // Обработка ошибок
  { path: 'test-error', component: TestErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },

  // Перенаправление на вход для всех остальных маршрутов
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }