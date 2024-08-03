import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {ITokenResponse} from "./auth.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/';
  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth() {
    if (!this.token) {
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + 'token'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));

      matches ? this.token = matches.toString() : this.token = null;
    }

    return !!this.token;
  }

  login(payload: {username: string, password: string}) {
    console.log(payload)

    const formData = new FormData();
    formData.append('username', payload.username);
    formData.append('password', payload.password);

    return this.http.post<ITokenResponse>(`${this.baseApiUrl}token`, formData)
      .pipe(
        tap(val => {
          this.token = val.access_token;
          this.refreshToken = val.refresh_token;

          document.cookie = `token = ${this.token}`;
          document.cookie = `refreshToken = ${this.refreshToken}`;
        })
      )
  }
}
