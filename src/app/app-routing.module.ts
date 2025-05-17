import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './account/login/login.component'; // Добавьте этот импорт!

const routes: Routes = [
  // Публичные маршруты (доступны всем)
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },

  // Защищенные маршруты (требуют авторизации)
  { 
    path: '', 
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { title: 'Главная' }},
      { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule), canActivate: [AuthGuard] },
      { path: 'basket', loadChildren: () => import('./basket/basket.module').then(m => m.BasketModule), canActivate: [AuthGuard] },
      { path: 'checkout', canActivate: [AuthGuard], loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule) },
      { path: 'orders', canActivate: [AuthGuard], loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) }
    ]
  },

  // Обработка ошибок
  { path: 'test-error', component: TestErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },

  // Перенаправление на вход для всех остальных маршрутов
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }