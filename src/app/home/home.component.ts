import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../shared/models/product';
import { ShopModule } from '../shop/shop.module';
import { ProductItemComponent } from '../shop/product-item/product-item.component';
import { map, of, ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
baseUrl = environment.apiUrl;
products: Product[] = [];

constructor(private http: HttpClient, private homeService: HomeService) { }

ngOnInit(): void {
  this.getProducts();
}

// getProducts() {
//   this.homeService.getProducts().subscribe({
//     next: response => {
//       this.products = response;
//     }
//   })
// }

getProducts(){
  this.products = [
    {
      id: 1,
      brand: 'Chanel',
      name: 'Coco Mademoiselle',
      perfumeType: 'Eau de Parfum',
      size: 50,
      container: 'Bottle',
      gender: 'Female',
      priceInDollar: 120,
      priceInRub: 9000,
      photoPath: 'hero1.jpg',
      quantity: 10,
      isHit: true,
      isNew: false
    },
    {
      id: 2,
      brand: 'Dior',
      name: 'Sauvage',
      perfumeType: 'Eau de Toilette',
      size: 100,
      container: 'Bottle',
      gender: 'Male',
      priceInDollar: 95,
      priceInRub: 7500,
      photoPath: 'hero2.jpg',
      quantity: 15,
      isHit: false,
      isNew: true
    },
   
  ];

  console.log(this.products);
}
}

