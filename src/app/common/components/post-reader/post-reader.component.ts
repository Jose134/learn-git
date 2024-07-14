import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MarkdownComponent } from '../markdown/markdown.component';
import { FileLoaderService } from '../../services/file-loader-service';

@Component({
  selector: 'app-post-reader',
  standalone: true,
  imports: [CommonModule, MarkdownComponent],
  templateUrl: './post-reader.component.html',
  styleUrl: './post-reader.component.css'
})
export class PostReaderComponent implements OnInit, OnChanges {
  
  @Input({required: true}) src: string | null = null;
  fileContent: string | null = null;

  constructor(private fileLoaderService: FileLoaderService) {}

  ngOnInit(): void {
    this.loadFileContent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src'] && !changes['src'].isFirstChange()) {
      this.loadFileContent();
    }
  }

  loadFileContent(): void {
    if (this.src) {
      this.fileLoaderService.getFileContents(this.src).subscribe((res: string | null) => {
        this.fileContent = res;
      });
    }
  }


}
