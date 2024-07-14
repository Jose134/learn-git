import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-codeblock',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './codeblock.component.html',
  styleUrl: './codeblock.component.css'
})
export class CodeblockComponent {
  @Input() code: string = '';
  @Input() isSolution: boolean = false;
  isRevealed: boolean = false;
  solutionClass: any = {
    'code-solution': this.isSolution && !this.isRevealed
  }

  toggleReveal(): void {
    this.isRevealed = !this.isRevealed;
    this.solutionClass = { 'code-solution': this.isSolution && !this.isRevealed };
  }
}
