import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Brand } from '../shared/models/brand';
import { Product } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { Type } from '../shared/models/type';
import { ShopService } from './shop.service';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})

export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  products: Product[] = [
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
     {
      id:3,
      brand: 'Gucci',
      name: 'Bloom',W-
      perfumeType: 'Eau de Parfum',
      size: 75,
      container: 'Bottle',
      gender: 'Female',
      priceInDollar: 110,
      priceInRub: 8500,
      photoPath: 'hero3.jpg',
      quantity: 8,
      isHit: true,
      isNew: true
    }
  ];
  brands: Brand[] = [];
  types: Type[] = [];
  shopParams: ShopParams;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to high', value: 'priceAsc'},
    {name: 'Price: High to low', value: 'priceDesc'},
  ];
  totalCount = 0;

  constructor(private shopService: ShopService, private homeService: HomeService) {
    this.shopParams = shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getProducts();
    // this.getBrands();
    // this.getTypes();
  }

  getProducts() {
    console.log('Получение духов')
    this.homeService.getProducts().subscribe({
      next: response => {
        this.products = response,
        console.log(this.products)
      },
      error: error => console.log(error)
    })
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: response => this.brands = [{id: 0, name: 'All'}, ...response],
      error: error => console.log(error)
    })
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: response => this.types = [{id: 0, name: 'All'}, ...response],
      error: error => console.log(error)
    })
  }

  onBrandSelected(brandId: number) {
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onSortSelected(event: any) {
    const params = this.shopService.getShopParams();
    params.sort = event.target.value;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onPageChanged(event: any) {
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.shopParams = params;
      this.getProducts();
    }
  }

  onSearch() {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm?.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onReset() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }

}
