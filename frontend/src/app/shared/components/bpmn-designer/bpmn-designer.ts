import { AfterViewInit, Component, ElementRef, OnDestroy, signal, ViewChild } from '@angular/core';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import Canvas from 'diagram-js/lib/core/Canvas';
import { INITIAL_BPMN_XML } from './configs/Templates';

@Component({
  imports: [],
  selector: 'app-bpmn-designer',
  styleUrl: './bpmn-designer.scss',
  templateUrl: './bpmn-designer.html',
})
export class BpmnDesigner implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  private canvasRef!: ElementRef<HTMLDivElement>;

  private modeler?: BpmnModeler;
  private destroyed = false;

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly dirty = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  async ngAfterViewInit(): Promise<void> {
    this.modeler = new BpmnModeler({
      container: this.canvasRef.nativeElement
    });

    this.modeler.on('commandStack.changed', () => {
      this.dirty.set(true);
    });

    try {
      await this.modeler.importXML(INITIAL_BPMN_XML);

      const canvas = this.modeler.get<Canvas>('canvas');
      canvas.zoom('fit-viewport');
    } catch (error: unknown) {
      this.errorMessage.set(this.getErrorMessage(error));
    } finally {
      this.loading.set(false);
    }
  }

  async exportXml(): Promise<string | null> {
    if (!this.modeler) {
      this.errorMessage.set('The BPMN editor is not initialized.');
      return null;
    }

    try {
      const result = await this.modeler.saveXML({ format: true });
      return result.xml ?? null;
    } catch (error: unknown) {
      this.errorMessage.set(this.getErrorMessage(error));
      return null;
    }
  }

  async downloadXml(): Promise<void> {
    const xml = await this.exportXml();

    if (!xml) {
      this.errorMessage.set('Could not export BPMN XML.');
      return;
    }

    const blob = new Blob([xml], {
      type: 'application/xml;charset=utf-8'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'flowcraft-workflow.bpmn';
    link.click();

    URL.revokeObjectURL(url);

    this.successMessage.set('BPMN XML exported successfully.');
    this.errorMessage.set(null);
  }

  async importXmlFile(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file || !this.modeler) {
      return;
    }

    try {
      const xml = await file.text();
      await this.modeler.importXML(xml);

      const canvas = this.modeler.get<Canvas>('canvas');
      canvas.zoom('fit-viewport');

      this.dirty.set(true);
      this.errorMessage.set(null);
      this.successMessage.set('BPMN XML imported successfully.');
    } catch (error: unknown) {
      this.errorMessage.set(this.getErrorMessage(error));
    } finally {
      input.value = '';
    }
  }


  async onSetXML(): Promise<void> {
    if (!this.modeler) {
      this.errorMessage.set('BPMN modeler has not been initialized.');
      return;
    }

    try {
      // 1. Read XML from localStorage
      const xml = localStorage.getItem('xml');

      if (!xml?.trim()) {
        this.errorMessage.set('No BPMN XML was found in localStorage.');
        this.successMessage.set(null);
        return;
      }

      // 2. Import the BPMN diagram
      const result = await this.modeler.importXML(xml);

      // 3. Fit the diagram into the visible canvas
      const canvas = this.modeler.get('canvas') as {
        zoom: (level: 'fit-viewport' | number) => void;
      };

      canvas.zoom('fit-viewport');

      // 4. Update UI state
      this.errorMessage.set(null);
      this.successMessage.set('BPMN XML imported successfully.');

      // Keep this if importing should mark the diagram as modified.
      this.dirty.set(true);

      // Optional: inspect import warnings
      if (result.warnings.length > 0) {
        console.warn('[BPMN import warnings]', result.warnings);
      }

      console.log('[BPMN XML imported successfully]');
    } catch (error: unknown) {
      console.error('[BPMN import error]', error);

      this.successMessage.set(null);
      this.errorMessage.set(this.getErrorMessage(error));
    }
  }


  async saveWorkflow(): Promise<void> {
    const xml = await this.exportXml();

    if (!xml) {
      return;
    }

    this.saving.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    try {
      // اینجا متد سرویس Workflow موجود را فراخوانی کن:
      // ایجاد Workflow جدید: POST /api/workflows
      // به‌روزرسانی Workflow: PATCH /api/workflows/:id
      //
      // درخواست باید شامل bpmnXml: xml باشد.
      // پس از موفقیت سرور:
      console.log('[xml]', xml)
      localStorage.setItem('xml', xml);
      this.dirty.set(false);
      this.successMessage.set('Workflow saved successfully.');
    } catch (error: unknown) {
      this.errorMessage.set(this.getErrorMessage(error));
    } finally {
      this.saving.set(false);
    }
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return 'An unexpected BPMN editor error occurred.';
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.modeler?.destroy();
    this.modeler = undefined;
  }
}