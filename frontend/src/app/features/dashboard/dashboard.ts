import { Component, OnInit, inject, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  private readonly apiService = inject(ApiService);

  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly health = signal<HealthResponse | null>(null);

  checkServer(): void {
    this.loading.set(true);
    this.errorMessage.set('');
    this.health.set(null);

    this.apiService.getHealth().subscribe({
      next: (response) => {
        this.health.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set(
          'ارتباط با سرور برقرار نشد. وضعیت بک‌اند و آدرس API را بررسی کنید.',
        );
        this.loading.set(false);
      },
    });
  }

  ngOnInit(): void {
  }


}
