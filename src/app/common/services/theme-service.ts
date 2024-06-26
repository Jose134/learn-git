import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Theme } from '../models/theme';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    private readonly DEFAULT_THEME: Theme = Theme.DARK;
    private localStorage: Storage | null = null;
    
    constructor(@Inject(DOCUMENT) private document: Document) {
        this.localStorage = this.document.defaultView?.localStorage || null;
        this.setTheme(this.getTheme());
    }

    private strToTheme(str: string): Theme {
        if (str === Theme.DARK || str === Theme.LIGHT) {
            return str as Theme;
        }

        return this.DEFAULT_THEME;        
    }

    getTheme(): Theme {
        return this.strToTheme(this.localStorage?.getItem('theme') || '');
    }

    switchTheme() {
        const theme: Theme = this.getTheme() === Theme.DARK
            ? Theme.LIGHT
            : Theme.DARK;

        this.setTheme(theme);
    }

    private setTheme(theme: Theme) {
        this.document.body.setAttribute("data-theme", theme);
        this.localStorage?.setItem('theme', theme);
    }

}