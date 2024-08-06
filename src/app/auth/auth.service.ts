import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, tap, throwError} from "rxjs";
import {ITokenResponse} from "./auth.interface";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/';
  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth() {
    if (!this.token) {
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + 'token'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));

      let matches2 = document.cookie.match(new RegExp(
        "(?:^|; )" + 'refreshToken'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));

      matches ? this.token = matches[1] : this.token = null;
      matches2 ? this.refreshToken = matches2[1] : this.refreshToken = null;
    }

    return !!this.token;
  }

  login(payload: {username: string, password: string}) {
    const formData = new FormData();
    formData.append('username', payload.username);
    formData.append('password', payload.password);

    return this.http.post<ITokenResponse>(`${this.baseApiUrl}token`, formData)
      .pipe(
        tap(res => this.saveTokens(res))
      )
  }

  refreshAuthToken() {
    return this.http.post<ITokenResponse>(
      `${this.baseApiUrl}refresh`,
      {
        refresh_token: this.refreshToken
      }
    ).pipe(
      tap(res => this.saveTokens(res)),
      catchError(err => {
        this.logout()
        return throwError(err)
      })
    )
  }

  logout() {
    document.cookie = '';
    this.token = null;
    this.refreshToken = null;
    this.router.navigate(['/login'])
  }

  saveTokens(res: ITokenResponse) {
    this.token = res.access_token;
    this.refreshToken = res.refresh_token;

    document.cookie = `token = ${this.token}`;
    document.cookie = `refreshToken = ${this.refreshToken}`;
  }
}
