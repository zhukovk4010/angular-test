import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_API_URL } from '../constans/api';
import { IProfile } from '../models/api/profile.interface';
import { AuthService } from '../api/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);
  private token = inject(AuthService).token
  
  getTestsAccounts() {
    return this.http.get<IProfile[]>(`${BASE_API_URL}account/test_accounts`);
  }

  getMe () {
    console.log(this.token)
    return this.http.get<IProfile>(`https://icherniakov.ru/yt-course/account/me`);
  }
}
