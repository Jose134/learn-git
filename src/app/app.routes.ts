import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ArticleComponent } from './pages/article/article.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'article/:name', component: ArticleComponent },
    { path: 'about', component: AboutComponent },
    
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
