import {Component} from '@angular/core';
import { ProfileCardComponent } from "../components/dummies/profile-card/profile-card.component";
// import { RouterOutlet } from '@angular/router';
// import {ProfileCardComponent} from "./common-ui/profile-card/profile-card.component";
// import {ProfileService} from "./data/services/profile.service";
// import {IProfile} from "./data/interfaces/profile.intarface";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProfileCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
