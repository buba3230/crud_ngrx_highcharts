import { Injectable } from '@angular/core';
import { HeroInterface } from '../interfaces/hero';
import { Observable, throwError } from 'rxjs';
import { delay, tap, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HerosService {
  private url = '/api/heroes';
  constructor(public http: HttpClient,
  ) { }

  getHeros(): Observable<HeroInterface[]> {
    return this.http.get<HeroInterface[]>(this.url)
      .pipe(
        tap(_ => console.log('fetched heros')),
        catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
      );
  }

  deleteHero(id: number): Observable<any> {
    return this.http.delete<HeroInterface>(this.url + '/' + id).pipe(
      tap(_ => {
        console.log('Hero was deleted');
      }),
      catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
      , delay(1200));
  }

  getHero(id: number): Observable<HeroInterface> {

    return this.http.get<HeroInterface[]>(this.url).pipe(
      map((heros: HeroInterface[]) => heros.find(item => item.id === id)),
      catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
    )
  }

  createHero(newHero: HeroInterface): Observable<any> {
    return this.http.post<HeroInterface>(this.url, newHero).pipe(
      tap(_ => console.log('added new Hero')),
      catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
    );
  }

  updateHero(HeroForUpdating: HeroInterface): Observable<any> {
    return this.http.put(this.url + '/' + HeroForUpdating.id, HeroForUpdating).pipe(
      tap(_ => console.log(`updated hero with id=${HeroForUpdating.id}`)),
      catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
    );
  }
}