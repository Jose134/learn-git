import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostReaderComponent } from '../../common/components/post-reader/post-reader.component';
import { CommonModule } from '@angular/common';
import { IndexService } from '../../common/services/index-service';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [RouterLink, PostReaderComponent, CommonModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit {

  previousRoute: string | null = null;
  nextRoute: string | null = null;
  articleFile: string | null = null;
  author: string | null = null;

  constructor(private route: ActivatedRoute, private indexService: IndexService) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.updateArticle();
    });
  }

  private updateArticle() {
    let articleName = this.route.snapshot.params['name'];
    this.previousRoute = this.indexService.getPreviousRoute(articleName);
    this.nextRoute = this.indexService.getNextRoute(articleName);
    this.articleFile = this.indexService.getFilePath(articleName);
    this.author = this.indexService.getAuthor(articleName);
  }

  scrollTop() {
    document.documentElement.scrollTop = 0;
  }

}
