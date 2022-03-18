import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeroInterface } from '../shared/types/interfaces/hero';
import { Store } from '@ngrx/store';
import { deleteHeroAction, getAllHerosAction, getHeroByIdAction } from '../store/actions/hero.action';
import { allHerosSelector } from '../store/selectors/hero.selectors';

import * as Highcharts from 'highcharts';

interface HeroSeries {
  name: string;
  data: number[];
}

enum HeroType {
  WIZARD = 'Wizard',
  WARIOR = 'Warior',
  ARCHER = 'Archer',
  NECROMANCER = 'Necromancer',
  ASSASIN = 'Assasin'
}

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.scss']
})
export class HerosComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'myHighchart';

  data: HeroSeries[] = [];

  highcharts = Highcharts;
  chartOptions: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  allHeros$ = this.store.select(allHerosSelector);
  deleteError: string;
  deleteId: number;
  isDeleting = false;
  allHeros: HeroInterface[];
  allHerosSubscription: Subscription;
  displayedColumns: string[] = ['id', 'name', 'localized_name', 'type', 'options'];
  dataSource;

  constructor(
    private router: Router,
    private store: Store) {
    this.store.dispatch(getAllHerosAction());
  }

  ngOnInit(): void {
    this.allHerosSubscription = this.allHeros$.subscribe((heros: HeroInterface[]) => {
      this.allHeros = heros;
      this.dataSource = new MatTableDataSource<HeroInterface>(this.allHeros);
    });

    this.getSeries();
  }

  ngAfterViewInit() {
    this.allHerosSubscription = this.allHeros$.subscribe((heros: HeroInterface[]) => {
      if (heros) {
        this.allHeros = heros;
        this.dataSource = new MatTableDataSource(this.allHeros);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  ngOnDestroy(): void {
    this.allHerosSubscription.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createHero(): void {
    this.router.navigate(['/hero-detail', 0, 'create']);
  }

  editHero(id: number) {
    this.store.dispatch(getHeroByIdAction({ id: id }));
    this.router.navigate(['/hero-detail', id, 'edit']);
  }

  deleteHero(id: number) {
    this.store.dispatch(deleteHeroAction({ id: id }));
    this.store.dispatch(getAllHerosAction());
  }

  getSeries() {
    this.allHerosSubscription = this.allHeros$.subscribe((heros: HeroInterface[]) => {
      const categories: string[] = ["Wizard", "Warior", "Archer", "Necromancer", "Assasin"];
      this.allHeros = heros;
      if (heros) {
        const totalByTypes = heros.map(hero => hero.type).reduce((map, type) => ({
          ...map,
          [type]: (map[type] || 0) + 1,
        }), {});
        this.data = [{
          name: 'Heros',
          data: categories.map(item => totalByTypes[item])
        }];

        this.chartOptions = {
          chart: {
            type: "column"
          },
          title: {
            text: "Count of Dota 2 Heros by type"
          },
          xAxis: {
            categories: categories
          },
          yAxis: {
            title: {
              text: "Count by type"
            }
          },
          series: this.data
        };
      }
    });
  }

}
