import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-placeholder',
  styleUrl: './placeholder.scss',
  templateUrl: './placeholder.html',
})
export class Placeholder {
  private readonly route = inject(ActivatedRoute);

  readonly title =
    this.route.snapshot.data['title'] as string ?? 'Coming Soon';

  readonly description =
    this.route.snapshot.data['description'] as string ?? '';
}
