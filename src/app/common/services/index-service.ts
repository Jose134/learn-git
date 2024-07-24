import { Injectable } from "@angular/core";
import { IndexEntry } from "../models/index-entry";

@Injectable({providedIn: 'root'})
export class IndexService {

    private readonly index: IndexEntry[] = [
        { level: 0, title: 'Solution Test', route: 'solutiontest', filepath: 'assets/articles/solutiontest.md', author: 'Jose134' },
        { level: 0, title: 'Tuto test', route: 'tutotest', filepath: 'assets/articles/tutorials/tutotest.md', author: ' ', tags: ['beginner', 'test'] },
        { level: 1, title: 'Highlighting Test', route: 'highlightingtest', filepath: 'assets/articles/tutorials/highlightingtest.md', tags: ['beginner'] },
        { level: 1, title: 'Highlighting Test', route: 'highlightingtest', filepath: 'assets/articles/tutorials/highlightingtest.md', tags: ['beginner'] },
        { level: 1, title: 'Highlighting Test', route: 'highlightingtest', filepath: 'assets/articles/tutorials/highlightingtest.md', tags: ['beginner'] },
        { level: 2, title: 'Highlighting Test', route: 'highlightingtest', filepath: 'assets/articles/tutorials/highlightingtest.md', tags: ['beginner'] },
        { level: 2, title: 'Highlighting Test', route: 'highlightingtest', filepath: 'assets/articles/tutorials/highlightingtest.md', tags: ['beginner'] },
        { level: 0, title: 'Highlighting Test', route: 'highlightingtest', filepath: 'assets/articles/tutorials/highlightingtest.md', tags: ['beginner'] },
        { level: 1, title: 'Highlighting Test', route: 'highlightingtest', filepath: 'assets/articles/tutorials/highlightingtest.md', tags: ['beginner'] },
        { level: 2, title: 'Highlighting Test', route: 'highlightingtest', filepath: 'assets/articles/tutorials/highlightingtest.md', tags: ['beginner'] },
        { level: 1, title: 'Highlighting Test', route: 'highlightingtest', filepath: 'assets/articles/tutorials/highlightingtest.md', tags: ['beginner'] },
        { level: 2, title: 'Highlighting Test', route: 'highlightingtest', filepath: 'assets/articles/tutorials/highlightingtest.md', tags: ['beginner'] },
        { level: 2, title: 'Highlighting Test', route: 'highlightingtest', filepath: 'assets/articles/tutorials/highlightingtest.md', tags: ['beginner'] },
        { level: 2, title: 'Highlighting Test', route: 'highlightingtest', filepath: 'assets/articles/tutorials/highlightingtest.md', tags: ['beginner'] },
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

    getAllEntries(): IndexEntry[] {
        let indexView: IndexEntry[] = [];
        this.index.forEach(entry => {
            indexView.push({
                level: entry.level,
                title: entry.title,
                route: entry.route,
                filepath: entry.filepath,
            });
        });
        return indexView;
    }
    
}