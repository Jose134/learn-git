import { Component, OnInit } from '@angular/core';
import { IndexEntry } from '../../common/models/index-entry';
import { IndexService } from '../../common/services/index-service';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';

interface IndexListNode {
  value: IndexEntry;
  children: IndexListNode[];
}

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [NgIf, NgFor, NgTemplateOutlet],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  index: IndexListNode[] = [];

  constructor(private indexService: IndexService) {}

  ngOnInit(): void {
    this.index = this.buildIndexList(this.indexService.getAllEntries());
  }

  private buildIndexList(index: IndexEntry[]): IndexListNode[] {
    if (index.length === 0) {
      return [];
    }

    let listStack: IndexListNode[][] = [];
    let currentList: IndexListNode[] = [];

    let currentLevel = index[0].level;
    for (let i = 0; i < index.length; i++) {
      if (index[i].level === currentLevel + 1) {
        // Go in one level deeper (Ex: from 1 to 1.1)
        listStack.push(currentList);
        currentList = [];
        currentLevel = index[i].level;
      }
      else if (index[i].level > currentLevel) {
        // Something went wrong (Ex: from 1 to 1.1.1)
        console.error(`Invalid index level: ${index[i].level}. Please review the index entries.`);
      }
      else {
        // Go back to the previous level (Ex: from 1.1 to 1, from 1.1.1 to 1.1)
        while (index[i].level < currentLevel) {
          let parent = listStack.pop() ?? [];
          parent[parent.length - 1].children = currentList;
          currentList = parent;
          currentLevel--;
        }
      }

      // Build the current node
      const entry = index[i];
      const node: IndexListNode = {
        value: entry,
        children: [],
      };

      currentList.push(node);
      i += node.children.length;
    }

    // Go back to the root level
    while (listStack.length > 0) {
      let parent = listStack.pop() ?? [];
      parent[parent.length - 1].children = currentList;
      currentList = parent;
    }

    return currentList;
  }

}
