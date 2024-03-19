import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'home', loadComponent: () => import('./journal/journal.component')
            .then(c => c.JournalComponent)},
/*    { path: 'products', loadChildren: () => import('./features/products.routes')
            .then(r => r.ROUTES_PRODUCTS)},*/
    { path: 'new-template', loadComponent: () => import('./journal/new-entry-form-template.component')
            .then(c => c.NewEntryFormTemplateComponent)},
    { path: 'new-reactive', loadComponent: () => import('./journal/new-entry-form-reactive.component')
            .then(c => c.NewEntryFormReactiveComponent)},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'error', loadComponent: () => import('./core/error-page.component')
            .then(c => c.ErrorPageComponent)},
    { path: '**', redirectTo: '/error' },

];
