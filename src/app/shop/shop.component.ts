import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Brand } from '../shared/models/brand';
import { Product } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { Type } from '../shared/models/type';
import { ShopService } from './shop.service';
import { HomeService } from '../home/home.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  shopParams: ShopParams;
  sortOptions = [
    { name: 'По алфавиту', value: 'name' },
    { name: 'Сначала новинки', value: 'new' },
    { name: 'Сначала дешевые', value: 'cheap' },
    { name: 'Сначала доргие', value: 'expensive' },
  ];
  totalCount = 0;

  constructor(
    private shopService: ShopService,
    private homeService: HomeService
  ) {
    this.shopParams = shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  // getProducts() {
  //   console.log('Получение духов')
  //   this.homeService.getProducts().subscribe({
  //     next: response => {
  //       this.products = response,
  //       console.log(this.products)
  //     },
  //     error: error => console.log(error)
  //   })
  // }


  getProducts() {
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
        pictureUrl: '2.jpg',
        MyProperty: 'Текст',
        brand: 'Textura',
        type: 'Ваза',
      },

      {
        id: 1,
        name: 'Белая ваза',
        description: 'Описание',
        price: 1000,
        pictureUrl: '3.jpg',
        MyProperty: 'Текст',
        brand: 'Textura',
        type: 'Ваза',
      },
    ];
    this.applyFilters();
  }

  private applyFilters() {
    let filteredProducts = [...this.products];

    // Фильтр по бренду
    if (this.shopParams.brandId > 0) {
      filteredProducts = filteredProducts.filter((p) =>
        p.brand
          .toLowerCase()
          .includes(
            this.brands
              .find((b) => b.id === this.shopParams.brandId)
              ?.name.toLowerCase() || ''
          )
      );
    }

    // Фильтр по типу
    if (this.shopParams.typeId > 0) {
      filteredProducts = filteredProducts.filter((p) =>
        p.type
          .toLowerCase()
          .includes(
            this.types
              .find((t) => t.id === this.shopParams.typeId)
              ?.name.toLowerCase() || ''
          )
      );
    }

    // Поиск по названию
    if (this.shopParams.search) {
      const search = this.shopParams.search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.brand.toLowerCase().includes(search)
      );
    }

    // Сортировка
    switch (this.shopParams.sort) {
      case 'name':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'male':
        filteredProducts = filteredProducts.filter((p) => p.type === 'Male');
        break;
      case 'female':
        filteredProducts = filteredProducts.filter(
          (p) => p.type === 'Female'
        );
        break;
      case 'unisex':
        filteredProducts = filteredProducts.filter(
          (p) => p.type === 'Unisex'
        );
        break;
      case 'tester':
        filteredProducts = filteredProducts.filter(
          (p) => p.brand === 'Tester'
        );
        break;
    }

    this.products = filteredProducts;
  }

  getBrands() {
    if (this.brands.length > 0) return of(this.brands);

    // Временные данные для тестирования
    const brand = [
      { id: 1, name: 'Chanel' },
      { id: 2, name: 'Dior' },
      { id: 3, name: 'Gucci' },
    ];

    this.brands = [...brand, { id: 0, name: 'Все' }];
  return of(this.brands);
  }

  getTypes() {
    if (this.types.length > 0) return of(this.types);
  
    
    // Временные данные для тестирования
    const type = [
      { id: 1, name: 'Вазы' },
      { id: 2, name: 'Кружки' },
      { id: 3, name: 'Тарелки' }
    ];
    
    this.types = [...type, { id: 0, name: 'Все' }];
    return of(this.types);
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

  onPageChanged(event: any) {
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.shopParams = params;
      this.getProducts();
    }
  }
}

//   getBrands() {
//     this.shopService.getBrands().subscribe({
//       next: response => this.brands = [{id: 0, name: 'All'}, ...response],
//       error: error => console.log(error)
//     })
//   }

//   getTypes() {
//     this.shopService.getTypes().subscribe({
//       next: response => this.types = [{id: 0, name: 'All'}, ...response],
//       error: error => console.log(error)
//     })
//   }

//   onBrandSelected(brandId: number) {
//     const params = this.shopService.getShopParams();
//     params.brandId = brandId;
//     params.pageNumber = 1;
//     this.shopService.setShopParams(params);
//     this.shopParams = params;
//     this.getProducts();
//   }

//   onTypeSelected(typeId: number) {
//     const params = this.shopService.getShopParams();
//     params.typeId = typeId;
//     params.pageNumber = 1;
//     this.shopService.setShopParams(params);
//     this.shopParams = params;
//     this.getProducts();
//   }

//   onSortSelected(event: any) {
//     const params = this.shopService.getShopParams();
//     params.sort = event.target.value;
//     this.shopService.setShopParams(params);
//     this.shopParams = params;
//     this.getProducts();
//   }

//   onPageChanged(event: any) {
//     const params = this.shopService.getShopParams();
//     if (params.pageNumber !== event) {
//       params.pageNumber = event;
//       this.shopService.setShopParams(params);
//       this.shopParams = params;
//       this.getProducts();
//     }
//   }

//   onSearch() {
//     const params = this.shopService.getShopParams();
//     params.search = this.searchTerm?.nativeElement.value;
//     params.pageNumber = 1;
//     this.shopService.setShopParams(params);
//     this.shopParams = params;
//     this.getProducts();
//   }

//   onReset() {
//     if (this.searchTerm) this.searchTerm.nativeElement.value = '';
//     this.shopParams = new ShopParams();
//     this.shopService.setShopParams(this.shopParams);
//     this.getProducts();
//   }

// }
