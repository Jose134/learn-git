import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-git-graph',
  standalone: true,
  imports: [],
  templateUrl: './git-graph.component.html',
  styleUrl: './git-graph.component.css'
})
export class GitGraphComponent {
  @Input({required: true}) src: string | null = null;
}
