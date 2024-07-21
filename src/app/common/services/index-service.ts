import { Injectable } from "@angular/core";
import { IndexEntry } from "../models/index-entry";

@Injectable({providedIn: 'root'})
export class IndexService {

    private readonly index: IndexEntry[] = [
        { route: 'solutiontest', filepath: 'assets/articles/solutiontest.md', author: 'Jose134' },
        { route: 'index', filepath: 'assets/articles/index.md' },
        { route: 'tutotest', filepath: 'assets/articles/tutorials/tutotest.md', author: ' ', tags: ['beginner', 'test'] },
        { route: 'highlightingtest', filepath: 'assets/articles/tutorials/highlightingtest.md', tags: ['beginner'] },
    ];

    getPreviousRoute(route: string): string | null {
        const idx = this.index.findIndex(entry => entry.route === route);
        if (idx != -1 && idx != 0) {
            return this.index[idx-1].route;
        }
        return null;
    }

    getNextRoute(route: string): string | null {
        const idx = this.index.findIndex(entry => entry.route === route);
        if (idx != -1 && idx != this.index.length - 1) {
            return this.index[idx+1].route;
        }
        return null;
    }

    getEntryInfo(route: string): IndexEntry | null {
        return this.index.find(entry => entry.route === route) ?? null;
    }
    
}