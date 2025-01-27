import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../widgets/sidebar/sidebar.component";
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  profileService = inject(ProfileService);

  ngOnInit() {
    this.profileService.getMe().subscribe(res => {
      console.log(res);
    })
  }
}
