import { Injectable } from "@angular/core";
import { IndexEntry } from "../models/index-entry";

@Injectable({providedIn: 'root'})
export class IndexService {

    index: IndexEntry[] = [
        { route: 'solutiontest', filepath: 'assets/articles/solutiontest.md' },
        { route: 'index', filepath: 'assets/articles/index.md' },
        { route: 'tutotest', filepath: 'assets/articles/tutorials/tutotest.md' },
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

    getFilePath(route: string): string | null {
        return this.index.find(entry => entry.route === route)?.filepath ?? null;
    }
    
}