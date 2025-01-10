import {Component, inject} from '@angular/core';
import { ProfileCardComponent } from "../components/dummies/profile-card/profile-card.component";
import { ProfileService } from '../services/profile.service';
import { JsonPipe } from '@angular/common';
import { IProfile } from '../models/api/profile.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProfileCardComponent , JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  profileService = inject(ProfileService);

  profiles: IProfile[] = []

  constructor() {
    this.profileService.getTestsAccounts().subscribe(res => {
      this.profiles = res;
    })
  }
}
