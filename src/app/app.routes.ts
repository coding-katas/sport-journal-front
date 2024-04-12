import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { journalResolver } from './journal/journal.resolver';

export const routes: Routes = [
    { path: 'home', resolve: { exerciceList: journalResolver }, canActivate: [authGuard], loadComponent: () => import('./journal/journal.component')
            .then(c => c.JournalComponent)},
    { path: 'new-template', canActivate: [authGuard], loadComponent: () => import('./journal/new-entry-form-template.component')
            .then(c => c.NewEntryFormTemplateComponent)},
    { path: 'new-reactive', canActivate: [authGuard], loadComponent: () => import('./journal/new-entry-form-reactive.component')
            .then(c => c.NewEntryFormReactiveComponent)},
    { path: '', loadComponent: () => import('./core/login.component')
            .then(c => c.LoginComponent)},
    { path: 'error', loadComponent: () => import('./core/error-page.component')
            .then(c => c.ErrorPageComponent)},
    { path: '**', redirectTo: '/error' },

];



