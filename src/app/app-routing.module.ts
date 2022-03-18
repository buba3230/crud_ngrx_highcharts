import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: () => import('./heros/heros.module').then(m => m.HerosModule), pathMatch: 'full' },
  { path: 'hero-detail/:id/:operation', loadChildren: () => import('./hero-detail/hero-detail.module').then(m => m.HeroDetailModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
