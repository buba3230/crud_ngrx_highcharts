import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroInterface } from '../shared/types/interfaces/hero';
import { Store } from '@ngrx/store';
import { createHeroAction, updateHeroAction } from '../store/actions/hero.action';
import { selectedHeroByIdSelector } from '../store/selectors/hero.selectors';
import { Subscription } from 'rxjs';

const enum OperationType {
  CREATE = 'create',
  EDIT = 'edit'
}

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  selectedHero$ = this.store.select(selectedHeroByIdSelector);
  heroID: number;
  hero: HeroInterface = { id: 0, name: "", localized_name: "", type: "" };;
  submitting = false;
  formError: string;
  operation: string;
  selectedHeroSubscription: Subscription;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private store: Store) { }

  ngOnInit(): void {
    this.heroID = this.route.snapshot.params['id'];
    this.operation = this.route.snapshot.params['operation'];
    this.selectedHeroSubscription = this.selectedHero$.subscribe(hero => {
      this.hero.id = hero.id;
      this.hero.name = hero.name;
      this.hero.localized_name = hero.localized_name;
      this.hero.type = hero.type;
    });
    if (this.operation == OperationType.CREATE) {
      this.hero = { id: 0, name: "", localized_name: "", type: "" };
    }
  }

  ngOnDestroy(): void {
    this.selectedHeroSubscription.unsubscribe();
  }

  onSubmit(heroForm: NgForm): void {
    const id = +heroForm.controls['id'].value;
    const name = heroForm.controls['name'].value;
    const localized_name = heroForm.controls['localized_name'].value;
    const type = heroForm.controls['type'].value;

    let obj = {
      "id": id,
      "name": name,
      "localized_name": localized_name,
      "type": type,
    }
    if (heroForm.valid) {
      this.submitting = true;
      this.formError = null;
      if (this.operation == OperationType.CREATE)
        this.createHero(obj);
      if (this.operation == OperationType.EDIT)
        this.updateHero(obj);
    }
  }

  createHero(heroForCreating: HeroInterface) {
    this.store.dispatch(createHeroAction({ hero: heroForCreating }))
  }

  updateHero(heroForUpdating: HeroInterface) {
    this.store.dispatch(updateHeroAction({ hero: heroForUpdating }))
  }

}
