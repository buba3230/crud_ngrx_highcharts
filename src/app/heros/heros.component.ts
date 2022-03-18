import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HerosService } from '../shared/types/service/heros.service';
import { HeroInterface } from '../shared/types/interfaces/hero';
import { Store } from '@ngrx/store';
import { deleteHeroAction, getAllHerosAction, getHeroByIdAction } from '../store/actions/hero.action';
import { allHerosSelector } from '../store/selectors/hero.selectors';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.scss']
})
export class HerosComponent implements OnInit, AfterViewInit, OnDestroy {
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

}
