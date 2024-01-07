import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { Observable, catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-post-reader',
  standalone: true,
  imports: [MarkdownComponent, CommonModule],
  templateUrl: './post-reader.component.html',
  styleUrl: './post-reader.component.css'
})
export class PostReaderComponent implements OnInit {
  
  @Input({required: true}) src: string = '';
  fileExists: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.checkFileExists(this.src).subscribe((res: boolean) => {
      this.fileExists = res;
    });
  }

  checkFileExists(url: string): Observable<boolean> {
    return this.http.get(url, { responseType: 'blob' })
    .pipe(
        map(response => {
            return true;
        }),
        catchError(error => {
            return of(false);
        })
    );
  }

}
