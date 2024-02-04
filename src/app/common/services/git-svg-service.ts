import { Inject, Injectable } from "@angular/core";
import { GitGraph } from "../models/git-graph";
import { DOCUMENT } from "@angular/common";

@Injectable({providedIn: 'root'})
export class GitSvgService {

    constructor(@Inject(DOCUMENT) private document: Document) {}

    generateSvgGraph(graph: GitGraph): HTMLElement {
        let a = this.document.createElement('a');
        a.innerText = 'asdf';
        return a;
    }

}