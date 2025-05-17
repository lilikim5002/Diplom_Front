  import { Component } from '@angular/core';
  import { FormControl, FormGroup, Validators } from '@angular/forms';
  import { ActivatedRoute, Router } from '@angular/router';
  import { AccountService } from '../account.service';

  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
  })
  export class LoginComponent {
    loginForm = new FormGroup({
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^(\\+7|8)?[0-9]{10}$'),
      ]),
      password: new FormControl('', Validators.required),
    });
    returnUrl: string;

    mockMode = false;
    constructor(
      private accountService: AccountService,
      private router: Router,
      private activatedRoute: ActivatedRoute
    ) {
      this.returnUrl =
        this.activatedRoute.snapshot.queryParams['returnUrl'] || '/shop ';
    }

    onSubmit() {
      if (this.mockMode) {
        // Для мокового режима используем фиксированные данные
        if (
          this.loginForm.get('phoneNumber')?.value === '+71234567890' &&
          this.loginForm.get('password')?.value === '123456'
        ) {
          this.router.navigateByUrl('/home');
        } else {
          alert('Неверные учетные данные');
        }
      } else {
        this.accountService.login(this.loginForm.value).subscribe({
          next: () => this.router.navigateByUrl('/home'),
          error: () => alert('Ошибка входа'),
        });
      }
    }

    

    // onSubmit() {
    //   this.accountService.login(this.loginForm.value).subscribe({
    //     next: () => this.router.navigateByUrl(this.returnUrl),
    //   });
    // }
  }
