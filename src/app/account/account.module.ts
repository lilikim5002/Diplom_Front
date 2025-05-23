import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeService } from '../home/home.service';

@NgModule({
  declarations: [
    LoginComponent,
    // RegisterComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ],
  providers: [HomeService]
})
export class AccountModule { }
