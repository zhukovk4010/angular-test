import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/';

  login(payload: {username: string, password: string}) {
    console.log(payload)

    const formData = new FormData();
    formData.append('username', payload.username);
    formData.append('password', payload.password);

    return this.http.post(`${this.baseApiUrl}token`, formData).subscribe(res => console.log(res));
  }
}
