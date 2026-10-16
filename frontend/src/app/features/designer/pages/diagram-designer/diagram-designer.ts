import { Component } from '@angular/core';
import { BpmnDesigner } from '../../../../shared/components/bpmn-designer/bpmn-designer';

@Component({
  imports: [BpmnDesigner],
  selector: 'app-diagram-designer',
  styleUrl: './diagram-designer.scss',
  templateUrl: './diagram-designer.html',
})
export class DiagramDesigner {}
