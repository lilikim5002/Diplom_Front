import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrl = environment.apiUrl;
  products: Product[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'Products').pipe(
        map(response => {
          this.products = response.data;
          return response;
      })
    )
  }
}
