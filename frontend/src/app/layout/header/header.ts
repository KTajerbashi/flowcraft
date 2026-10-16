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
        entityId: 'workflows',
        name: 'workflows',
        title: 'Workflows',
        icon: '⚙️',
        link: '/workflows',
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

    ];
  }
}
