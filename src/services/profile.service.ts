import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_API_URL } from '../constans/api';
import { IProfile } from '../models/api/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);
  
  getTestsAccounts() {
    return this.http.get<IProfile[]>(`${BASE_API_URL}account/test_accounts`);
  }
}
