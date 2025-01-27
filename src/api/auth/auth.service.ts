import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Pipe } from '@angular/core';
import { BASE_API_URL } from '../../constans/api';
import { catchError, tap, throwError } from 'rxjs';
import { ITokerResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  cookieService = inject(CookieService);
  router = inject(Router);

  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
      this.refreshToken = this.cookieService.get('refreshToken');
    }

    return !!this.token;
  }

  login(payload: {username: string, password: string}) {
    const fd = new FormData();

    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http.post<ITokerResponse>(`${BASE_API_URL}auth/token`, fd).pipe(
      tap(res => {
        this.saveTokens(res)
      })
    )
  }

  refreshAuthToken() {
    return this.http.post<ITokerResponse>(`${BASE_API_URL}auth/refresh`, {
      refresh_token: this.refreshToken
    }).pipe(
      tap(res => {
        this.saveTokens(res);
      }),
      catchError(error => {
        this.logout()
        return throwError(error);
      })
    )
  }

  logout() {
    this.cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.router.createUrlTree(['/login']);
  }

  saveTokens(res: ITokerResponse) {
    this.token = res.access_token;
    this.refreshToken = res.refresh_token;

    this.cookieService.set('token', this.token);
    this.cookieService.set('refreshToken', this.refreshToken);
  }
  
}
