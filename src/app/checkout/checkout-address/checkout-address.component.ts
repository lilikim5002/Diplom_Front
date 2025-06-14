    import { Component, Input } from '@angular/core';
    import { FormGroup } from '@angular/forms';
    import { ToastrService } from 'ngx-toastr';
    import { Router } from '@angular/router'; 

    @Component({
      selector: 'app-checkout-address',
      templateUrl: './checkout-address.component.html',
      styleUrls: ['./checkout-address.component.scss']
    })
    export class CheckoutAddressComponent {
      @Input() checkoutForm?: FormGroup;

      constructor(
        private router: Router 
      ) {}

      onSubmit() {
        if (this.checkoutForm?.valid) {
          this.router.navigate(['/checkout/success']); 
        }
        }
      }