import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroDetailComponent } from './hero-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HerosService } from '../shared/types/service/heros.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../store/reducers/hero.reducers';
import { createHeroEffect } from '../store/effects/hero.effect';

const routes: Routes = [
  {
    path: '',
    component: HeroDetailComponent,
  },
];

@NgModule({
  declarations: [HeroDetailComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('hero', reducers),
    EffectsModule.forFeature([createHeroEffect])
  ],
  exports: [
    HeroDetailComponent,
    HttpClientModule,
  ],
  providers: [HerosService]
})
export class HeroDetailModule { }
