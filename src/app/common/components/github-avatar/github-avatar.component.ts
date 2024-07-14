import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-github-avatar',
  standalone: true,
  imports: [],
  templateUrl: './github-avatar.component.html',
  styleUrl: './github-avatar.component.css'
})
export class GithubAvatarComponent {
  @Input() src: string | null = null;
}
