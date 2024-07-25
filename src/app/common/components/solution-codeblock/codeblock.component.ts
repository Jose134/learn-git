import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CodeHighlight, CodeHighlightType } from '../../models/code-highlight';

@Component({
  selector: 'app-codeblock',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './codeblock.component.html',
  styleUrl: './codeblock.component.css'
})
export class CodeblockComponent {
  @Input() code: CodeHighlight[] = [];
  @Input() isSolution: boolean = false;
  isRevealed: boolean = false;
  solutionClass: any = {
    'code-solution': this.isSolution && !this.isRevealed
  }

  toggleReveal(): void {
    this.isRevealed = !this.isRevealed;
    this.solutionClass = { 'code-solution': this.isSolution && !this.isRevealed };
  }

  getHighlightClass(highlight: CodeHighlightType): any {
    let classObj: any = {};
    classObj[highlight] = true;
    return classObj;
  }
}
