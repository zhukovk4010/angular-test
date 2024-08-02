import {Component, inject} from '@angular/core';
import {ProfileCardComponent} from "../../common-ui/profile-card/profile-card.component";
import {ProfileService} from "../../data/services/profile.service";
import {IProfile} from "../../data/interfaces/profile.intarface";

@Component({
  selector: 'app-search-page',
  standalone: true,
    imports: [
        ProfileCardComponent
    ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  profileService = inject(ProfileService);
  profiles: IProfile[] = []

  constructor() {
    this.profileService.getTestAccounts().subscribe(res => {
      this.profiles = res;
    });
  }
}
