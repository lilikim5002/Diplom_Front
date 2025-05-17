import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address, User } from '../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  private mockUser: User = {
    telegram: 'test',
    displayName: 'test',
    token: 'test',
    phoneNumber: '89999999999',
  };

  constructor(private http: HttpClient, private router: Router) {}

  loadCurrentUser(token: string | null) {
    if (token == null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(this.baseUrl + 'account', { headers }).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
          return user;
        } else {
          return null;
        }
      })
    );
  }

  login(values: any): Observable<User> {
    if (values.phoneNumber === '+71234567890' && values.password === 'test') {
      localStorage.setItem('token', 'mock-token');
      this.currentUserSource.next(this.mockUser);
      this.router.navigateByUrl('/home');
      return of(this.mockUser);
    }

    return this.http.post<User>(this.baseUrl + 'Auth', values).pipe(
      map((user) => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
        this.router.navigateByUrl('/home');
        return user;
      })
    );
  }

  // заменить потом на тот что ниже
  // login(values: any) {
  //   console.log(values);
  //   return this.http.post<User>(this.baseUrl + 'Auth', values).pipe(
  //     map(user => {
  //       localStorage.setItem('token', user.token);
  //       this.currentUserSource.next(user);
  //       this.router.navigateByUrl('/');
  //     })
  //   )
  // }

  // register(values: any) {
  //   return this.http.post<User>(this.baseUrl + 'account/register', values).pipe(
  //     map(user => {
  //       localStorage.setItem('token', user.token);
  //       this.currentUserSource.next(user);
  //     })
  //   )
  // }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/login');
  }

  checkTgExists(telegram: string) {
    return this.http.get<boolean>(
      this.baseUrl + 'account/telegramExists?telegram=' + telegram
    );
  }

  getUserAddress() {
    return this.http.get<Address>(this.baseUrl + 'account/address');
  }

  updateUserAddress(address: Address) {
    return this.http.put(this.baseUrl + 'account/address', address);
  }
}
