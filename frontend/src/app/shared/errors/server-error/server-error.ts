
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './server-error.html',
  styleUrl: './server-error.scss',
})
export class ServerError {
  onRetry(): void {
    window.location.reload();
  }
}
