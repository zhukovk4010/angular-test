import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_API_URL } from '../../constans/api';
import { tap } from 'rxjs';
import { ITokerResponse } from './auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);

  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth() {
    return !!this.token;
  }

  login(payload: {username: string, password: string}) {
    const fd = new FormData();

    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http.post<ITokerResponse>(`${BASE_API_URL}auth/token`, fd).pipe(
      tap(val => {
        this.token = val.access_token;
        this.refreshToken = val.refresh_token;
      })
    )
  }
  
}
