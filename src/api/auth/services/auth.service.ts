import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_API_URL } from '../../../constans/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);

  login(payload: {username: string, password: string}) {
    const fd = new FormData();

    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http.post(`${BASE_API_URL}auth/token`, fd);
  }
  
}
