import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { HeroInterface } from "src/app/shared/types/interfaces/hero";
import { HerosService } from "src/app/shared/types/service/heros.service";
import {
    createHeroAction, createHeroFailureAction, createHeroSuccessAction,
    updateHeroAction, updateHeroSuccessAction, updateHeroFailureAction,
    deleteHeroAction, deleteHeroSuccessAction, deleteHeroFailureAction,
    getHeroByIdAction, getHeroByIdSuccessAction, getHeroByIdFailureAction,
    getAllHerosAction, getAllHerosSuccessAction, getAllHerosFailureAction,
} from "../actions/hero.action";

@Injectable()
export class createHeroEffect {
    create$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createHeroAction),
            switchMap(({ hero }) => {
                return this.herosService.createHero(hero).pipe(
                    map((hero: HeroInterface) => {
                        return createHeroSuccessAction({ hero })
                    })
                )
            }),
            catchError((errorResponse: HttpErrorResponse) => {
                return of(createHeroFailureAction(
                    { errors: errorResponse.error.errors }
                ))
            })
        )
    );

    update$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateHeroAction),
            switchMap(({ hero }) => {
                return this.herosService.updateHero(hero).pipe(
                    map((hero: HeroInterface) => {
                        return updateHeroSuccessAction({ hero })
                    })
                )
            }),
            catchError((errorResponse: HttpErrorResponse) => {
                return of(updateHeroFailureAction(
                    { errors: errorResponse.error.errors }
                ))
            })
        )
    );

    delete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteHeroAction),
            switchMap(({ id }) => {
                return this.herosService.deleteHero(id).pipe(
                    map((id: number) => {
                        return deleteHeroSuccessAction({ id })
                    })
                )
            }),
            catchError((errorResponse: HttpErrorResponse) => {
                return of(deleteHeroFailureAction(
                    { errors: errorResponse.error.errors }
                ))
            })
        )
    );

    getHeroById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getHeroByIdAction),
            switchMap(({ id }) => {
                return this.herosService.getHero(id).pipe(
                    map((hero: HeroInterface) => {
                        return getHeroByIdSuccessAction({ hero })
                    })
                )
            }),
            catchError((errorResponse: HttpErrorResponse) => {
                return of(getHeroByIdFailureAction(
                    { errors: errorResponse.error.errors }
                ))
            })
        )
    );

    getAllHeros$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getAllHerosAction),
            switchMap(_ => {
                return this.herosService.getHeros().pipe(
                    map((heros: HeroInterface[]) => {
                        return getAllHerosSuccessAction({ heros })
                    })
                )
            }),
            catchError((errorResponse: HttpErrorResponse) => {
                return of(getAllHerosFailureAction(
                    { errors: errorResponse.error.errors }
                ))
            })
        )
    );


    /* redirecting */
    redirectAfterCreating$ = createEffect(
        () => this.actions$.pipe(
            ofType(createHeroSuccessAction),
            tap(() => {
                this.router.navigateByUrl('/');
            })
        ),
        { dispatch: false }
    )

    redirectAfterUpdating$ = createEffect(
        () => this.actions$.pipe(
            ofType(updateHeroSuccessAction),
            tap(() => {
                this.router.navigateByUrl('/');
            })
        ),
        { dispatch: false }
    )

    redirectAfterDeleting$ = createEffect(
        () => this.actions$.pipe(
            ofType(deleteHeroSuccessAction),
            tap(() => {
                this.router.navigateByUrl('/');
            })
        ),
        { dispatch: false }
    )

    constructor(private herosService: HerosService, private actions$: Actions, private router: Router) { }
}