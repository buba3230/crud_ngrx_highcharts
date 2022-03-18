import { Action, createReducer, on } from "@ngrx/store";

import {
    createHeroAction, createHeroFailureAction, createHeroSuccessAction,
    getAllHerosSuccessAction,
    getHeroByIdSuccessAction
} from "src/app/store/actions/hero.action";
import { HeroStateInterface } from "../types/heroState.interface";

const initialState: HeroStateInterface = {
    hero: null,
    selectedHero: { id: 0, name: "", localized_name: "", type: "" },
    allHeros: null
}

const heroReducer = createReducer(
    initialState,
    on(
        createHeroAction,
        (state): HeroStateInterface => ({
            ...state
        })
    ),
    on(
        createHeroSuccessAction,
        (state, action): HeroStateInterface => ({
            ...state,
            hero: action.hero,
        })
    ),
    on(
        createHeroFailureAction,
        (state): HeroStateInterface => ({
            ...state
        })
    ),
    on(
        getHeroByIdSuccessAction,
        (state, action): HeroStateInterface => {
            const allHeros = state.allHeros;

            return {
                ...state,
                selectedHero: action.hero
            }
        }
    ),
    on(
        getAllHerosSuccessAction,
        (state, action): HeroStateInterface => {
            return {
                ...state,
                allHeros: action.heros
            }
        }
    ),
)

export function reducers(state: HeroStateInterface, action: Action) {
    return heroReducer(state, action)
}
