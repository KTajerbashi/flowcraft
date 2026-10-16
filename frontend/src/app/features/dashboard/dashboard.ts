import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

// Adjust this import to your actual service path.
import { ApiService } from '../../core/services/api.service';
import { WorkflowService } from '../workflows/services/workflow.service';

interface Workflow {
  id: string;
  name: string;
  status: 'Active' | 'Draft' | 'Archived';
  updatedAt: string | Date;
}

interface WorkflowStats {
  total: number;
  active: number;
  drafts: number;
  archived: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  workflows: IWorkflow[] = [];

  stats: WorkflowStats = {
    total: 0,
    active: 0,
    drafts: 0,
    archived: 0
  };

  isLoading = true;
  errorMessage = '';

  constructor(
    private readonly workflowService: WorkflowService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadWorkflows();
  }

  loadWorkflows(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.workflowService.onGetWorkflows().subscribe({
      next: (workflows: IWorkflow[]) => {
        this.workflows = workflows;
        this.calculateStats(workflows);
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage =
          'Unable to load workflows. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  private calculateStats(workflows: IWorkflow[]): void {
    this.stats = {
      total: workflows.length,
      active: workflows.filter(w => w.status === 'Active').length,
      drafts: workflows.filter(w => w.status === 'Draft').length,
      archived: workflows.filter(w => w.status === 'Archived').length
    };
  }

  createWorkflow(): void {
    this.router.navigate(['/designer', 'new']);
  }

  openWorkflow(id?: string): void {
    this.router.navigate(['/designer', id]);
  }
}