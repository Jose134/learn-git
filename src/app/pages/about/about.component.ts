import { Component, OnInit } from '@angular/core';
import { MarkdownComponent } from '../../common/components/markdown/markdown.component';
import { FileLoaderService } from '../../common/services/file-loader-service';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MarkdownComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {

  fileContent: string | null = null;

  constructor(private fileLoaderService: FileLoaderService) {}

  ngOnInit(): void {
    this.loadFileContent();
  }

  loadFileContent(): void {
    this.fileLoaderService.getFileContents('assets/about.md').subscribe((res: string | null) => {
      this.fileContent = res;
    });
  }


}
