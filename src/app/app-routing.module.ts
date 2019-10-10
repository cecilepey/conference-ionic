import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full'
  },
  {
    path: 'accueil',
    loadChildren: () => import('./accueil/accueil.module').then(m => m.AccueilPageModule)
  },
  {
    path: 'sessions',
    loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsPageModule)
  },
  { path: 'presentateurs', loadChildren: './presentateurs/presentateurs.module#PresentateursPageModule' },
  { path: 'sessions/:id', loadChildren: './session/session.module#SessionPageModule' },
  { path: 'presentateurs/:id', loadChildren: './presentateur/presentateur.module#PresentateurPageModule' },
  { path: 'notes/:id', loadChildren: './notes/notes.module#NotesPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
