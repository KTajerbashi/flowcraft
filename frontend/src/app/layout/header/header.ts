import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [CommonModule, RouterLink, RouterLinkActive],
  standalone: true,
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header implements OnInit {
  menus = signal<IMenuDTO[]>([]);

  ngOnInit(): void {
    this.menus.set(this.loadMenus());
  }

  private loadMenus(): IMenuDTO[] {
    return [
      {
        entityId: 'dashboard',
        name: 'dashboard',
        title: 'Dashboard',
        icon: 'bi bi-ui-radios-grid',
        link: '/dashboard',
        children: [],
      },
      {
        entityId: 'workflows',
        name: 'workflows',
        title: 'Workflows',
        icon: 'bi bi-command',
        link: '/workflows',
        children: [],
      },
      {
        entityId: 'designer',
        name: 'designer',
        title: 'Designer',
        icon: 'bi bi-pencil',
        link: '/designer',
        children: [],
      },
      {
        entityId: 'users',
        name: 'user',
        title: 'UserManagement',
        icon: 'bi bi-person',
        link: '/dashboard',
        children: [],
      },
    ];
  }
}
