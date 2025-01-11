import { Component, inject } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { IProfile } from '../../models/api/profile.interface';
import { ProfileCardComponent } from "../../components/dummies/profile-card/profile-card.component";

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  profileService = inject(ProfileService);

  profiles: IProfile[] = []

  constructor() {
    this.profileService.getTestsAccounts().subscribe(res => {
      this.profiles = res;
    })
  }
}
