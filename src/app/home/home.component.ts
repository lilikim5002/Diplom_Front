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
        name: 'Белая ваза',
        description: 'Описание',
        price: 1000,
        pictureUrl: '1.jpg',
        MyProperty: 'Текст',
        brand: 'Textura',
        type: 'Ваза',
    },
    {
        id: 1,
        name: 'Белая ваза',
        description: 'Описание',
        price: 1000,
        pictureUrl: '1.jpg',
        MyProperty: 'Текст',
        brand: 'Textura',
        type: 'Ваза',
    },
   
  ];

  console.log(this.products);
}
}

