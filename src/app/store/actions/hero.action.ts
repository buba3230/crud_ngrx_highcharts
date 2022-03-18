
import { createAction, props } from '@ngrx/store';
import { HeroInterface } from 'src/app/shared/types/interfaces/hero';
import { ActionTypes } from '../actionTypes';

/*create actions*/
export const createHeroAction = createAction(
    ActionTypes.CREATE_HERO,
    props<{ hero: HeroInterface }>()
)

export const createHeroSuccessAction = createAction(
    ActionTypes.CREATE_HERO_SUCCESS,
    props<{ hero: HeroInterface }>()
)

export const createHeroFailureAction = createAction(
    ActionTypes.CREATE_HERO_FAILURE,
    props<{ errors: string }>()
)

/*update actions*/
export const updateHeroAction = createAction(
    ActionTypes.UPDATE_HERO,
    props<{ hero: HeroInterface }>()
)

export const updateHeroSuccessAction = createAction(
    ActionTypes.UPDATE_HERO_SUCCESS,
    props<{ hero: HeroInterface }>()
)

export const updateHeroFailureAction = createAction(
    ActionTypes.UPDATE_HERO_FAILURE,
    props<{ errors: string }>()
)

/*delete actions*/
export const deleteHeroAction = createAction(
    ActionTypes.DELETE_HERO,
    props<{ id: number }>()
)

export const deleteHeroSuccessAction = createAction(
    ActionTypes.DELETE_HERO_SUCCESS,
    props<{ id: number }>()
)

export const deleteHeroFailureAction = createAction(
    ActionTypes.DELETE_HERO_FAILURE,
    props<{ errors: string }>()
)

/*get hero by id actions*/
export const getHeroByIdAction = createAction(
    ActionTypes.GET_HERO_BY_ID,
    props<{ id: number }>()
)

export const getHeroByIdSuccessAction = createAction(
    ActionTypes.GET_HERO_BY_ID_SUCCESS,
    props<{ hero: HeroInterface }>()
)

export const getHeroByIdFailureAction = createAction(
    ActionTypes.GET_HERO_BY_ID_FAILURE,
    props<{ errors: string }>()
)

/*get all heros actions*/
export const getAllHerosAction = createAction(
    ActionTypes.GET_ALL_HEROS
)

export const getAllHerosSuccessAction = createAction(
    ActionTypes.GET_ALL_HEROS_SUCCESS,
    props<{ heros: HeroInterface[] }>()
)

export const getAllHerosFailureAction = createAction(
    ActionTypes.GET_ALL_HEROS_FAILURE,
    props<{ errors: string }>()
)