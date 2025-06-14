import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BasketService } from '../basket/basket.service';
import { CheckoutService } from './checkout.service';
import { Order } from '../shared/models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  checkoutForm = this.fb.group({
    addressForm: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^(\\+7|8)?[0-9]{10}$')],
      ],
    })
  });

  constructor(
    private fb: FormBuilder,
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    if (!basket) {
      console.error('Корзина пуста');
      return;
    }

    const addressFormValue = this.checkoutForm.get('addressForm')?.value;
    
    this.checkoutService.createOrder({
      basketId: basket.id,
      shipToAddress: addressFormValue
    }).subscribe({
      next: (order: Order) => {
  
        this.basketService.deleteLocalBasket();
      
        this.router.navigate(['/checkout/success'], {
          state: { order }
        });
      },
      error: error => {
        console.error('Ошибка при создании заказа:', error);
      }
    });
  }
}