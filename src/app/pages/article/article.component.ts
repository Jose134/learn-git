import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostReaderComponent } from '../../components/post-reader/post-reader.component';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [PostReaderComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit {

  articleFile: string = '';

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    let articleName = this.route.snapshot.params['name'];
    this.articleFile = `assets/articles/${articleName}.md`;
  }

}
