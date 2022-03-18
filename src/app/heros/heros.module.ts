import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HerosComponent } from './heros.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HerosService } from '../shared/types/service/heros.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { createHeroEffect } from '../store/effects/hero.effect';
import { reducers } from '../store/reducers/hero.reducers';

import { HighchartsChartModule } from 'highcharts-angular';

const routes: Routes = [
  {
    path: '',
    component: HerosComponent,
  },
];

@NgModule({
  declarations: [HerosComponent],
  imports: [
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    HighchartsChartModule,
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('hero', reducers),
    EffectsModule.forFeature([createHeroEffect])
  ],
  exports: [
    HerosComponent,
    HttpClientModule,
  ],
  providers: [HerosService]
})
export class HerosModule { }
