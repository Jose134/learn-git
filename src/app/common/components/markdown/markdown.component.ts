import { Component, Input } from '@angular/core';
import { RemarkModule, RemarkTemplateDirective } from 'ngx-remark';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkCodeblock from '../../remark-processors/remarkCodeblock';
import remarkChips from '../../remark-processors/remarkChip';
import remarkGitGraph from '../../remark-processors/remarkGitGraph';
import remarkGHAvatar from '../../remark-processors/remarkGHAvatar';
import { GithubAvatarComponent } from '../github-avatar/github-avatar.component';
import { CodeblockComponent } from '../solution-codeblock/codeblock.component';
import { ChipsComponent } from '../chips/chips.component';
import { GitGraphComponent } from '../git-graph/git-graph.component';

@Component({
  selector: 'app-markdown',
  standalone: true,
  imports: [RemarkModule, ChipsComponent, CodeblockComponent, GithubAvatarComponent, GitGraphComponent],
  templateUrl: './markdown.component.html',
  styleUrl: './markdown.component.css'
})
export class MarkdownComponent {
  @Input({required: true}) markdown: string = '';
  processor = unified()
      .use(remarkParse)
      .use(remarkChips)
      .use(remarkCodeblock)
      .use(remarkGHAvatar)
      .use(remarkGitGraph);
}
