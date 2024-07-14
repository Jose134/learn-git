import { Component } from '@angular/core';
import { GitGraphComponent } from '../../common/components/git-graph/git-graph.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ GitGraphComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
