import { Component } from '@angular/core';
import {SvgIconComponent} from "../svg-icon/svg-icon.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: ''
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: '/chats'
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: '/search'
    },
  ]
}
