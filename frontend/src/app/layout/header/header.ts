import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
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
        icon: '⌂',
        link: '/dashboard',
        children: [],
      },

      {
        entityId: 'designer',
        name: 'designer',
        title: 'Designer',
        icon: '⌘',
        link: '/designer',
        children: [],
      },

      {
        entityId: 'processes',
        name: 'processes',
        title: 'Processes',
        icon: '▦',
        link: '/processes',
        children: [],
      },

      {
        entityId: 'templates',
        name: 'templates',
        title: 'Templates',
        icon: '◫',
        link: '/templates',
        children: [],
      },
      {
        entityId: 'users',
        name: 'users',
        title: 'Users',
        icon: '♙',
        link: '/users',
        children: [],
      },
      {
        entityId: 'roles',
        name: 'roles',
        title: 'Roles',
        icon: '◈',
        link: '/roles',
        children: [],
      },
      {
        entityId: 'groups',
        name: 'groups',
        title: 'Groups',
        icon: '♧',
        link: '/groups',
        children: [],
      },
      {
        entityId: 'forms',
        name: 'forms',
        title: 'Forms',
        icon: '▤',
        link: '/forms',
        children: [],
      },
    ];
  }
}
