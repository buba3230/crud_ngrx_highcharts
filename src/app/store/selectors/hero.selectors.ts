import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/store/types/appState.interface";
import { HeroStateInterface } from "src/app/store/types/heroState.interface";

export const heroFeatureSelector = createFeatureSelector<
    AppStateInterface,
    HeroStateInterface
>('hero');

export const selectedHeroByIdSelector = createSelector(
    heroFeatureSelector,
    (heroState: HeroStateInterface) => heroState.selectedHero
)

export const allHerosSelector = createSelector(
    heroFeatureSelector,
    (heroState: HeroStateInterface) => heroState.allHeros
)
