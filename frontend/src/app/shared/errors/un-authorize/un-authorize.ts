
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  templateUrl: './un-authorize.html',
  styleUrl: './un-authorize.scss',
})
export class UnAuthorize {
  private readonly router = inject(Router);

  onLogin(): void {
    void this.router.navigate(['/login']);
  }

  onBackToDashboard(): void {
    void this.router.navigate(['/dashboard']);
  }
}
