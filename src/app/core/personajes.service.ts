import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { RequestApiRick, Result } from '../models/character.model';

import { BehaviorSubject, } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { handleHttpResponseError } from '../utils/error';

@Injectable( {
  providedIn: 'root'
} )
export class PersonajesService {

  page = 1;

  cargando$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( false );
  error$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( false );
  personajes$: BehaviorSubject<Result[]> = new BehaviorSubject<Result[]>( [] );
  personajes: Result[] = [];


  private apiUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) {
  }

  getPersonajes( page?: number ) {

    this.page = JSON.parse( localStorage.getItem( 'page' )! ) || 1;

    if ( this.personajes.length === 0 ) {
      this.http.get<RequestApiRick>( `${this.apiUrl}/character/?page=${this.page}` )
        .pipe(
          map( resp => resp.results ),
          tap( resp => {
            console.log( 'hola' );
            this.personajes = resp;
            this.personajes$.next( resp );
            this.cargando$.next( false );
          } ),
        ).subscribe();
    }

    if ( page ) {
      this.http.get<RequestApiRick>( `${this.apiUrl}/character/?page=${page}` )
        .pipe(
          map( resp => resp.results ),
          tap( resp => {
            this.personajes = resp;
            this.personajes$.next( resp );
            this.cargando$.next( false );
          } )
        ).subscribe();
    }

  };

  getFilterName( name: string ) {
    return this.http.get<RequestApiRick>( `${this.apiUrl}/character/?name=${name}` )
      .pipe(
        catchError( handleHttpResponseError ),
        retry( 2 ),
        map( resp => resp.results ),
        tap( resp => {
          this.personajes = resp;
          this.personajes$.next( resp );
          this.cargando$.next( false );
        } )
      );
  }

}
