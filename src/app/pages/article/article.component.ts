import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostReaderComponent } from '../../common/components/post-reader/post-reader.component';
import { CommonModule } from '@angular/common';
import { IndexService } from '../../common/services/index-service';
import { IndexEntry } from '../../common/models/index-entry';
import { ChipsComponent } from "../../common/components/chips/chips.component";

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [RouterLink, PostReaderComponent, CommonModule, ChipsComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit {

  previousRoute: string | null = null;
  nextRoute: string | null = null;
  article: IndexEntry | null = null;

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
    this.article = this.indexService.getEntryInfo(articleName);
  }

  scrollTop() {
    document.documentElement.scrollTop = 0;
  }

}
