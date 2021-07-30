import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Login, User } from 'src/app/models/user.model';
import { RequestLogin } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

import { BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';



@Injectable( {
  providedIn: 'root'
} )
export class AuthService {

  private baseUrl = environment.apiStore;

  users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>( [] );
  private user$: BehaviorSubject<User> = new BehaviorSubject<User>( {} as User );
  users: User[] = [];


  get user() {
    return this.user$.asObservable();
  }

  constructor(
    private http: HttpClient
  ) {
    this.user$.next( JSON.parse( localStorage.getItem( 'user' )! ) || '' );
  }

  getAllUsers(): void {
    if ( this.users.length === 0 ) {
      this.http.get<User[]>( `${this.baseUrl}/user` )
        .pipe(
          tap( users => {
            console.log( 'hola' );
            this.users$.next( users );
            this.users = users;
          } )
        ).subscribe();
    }
  }

  loginUser( data: Login ) {
    return this.http.post<RequestLogin>( `${this.baseUrl}/auth/login`, data )
      .pipe(
        tap( request => {
          localStorage.setItem( 'token', request.access_token );
          localStorage.setItem( 'user', JSON.stringify( request.user ) );
          this.user$.next( request.user );
        } )
      );
  }

  registerUser( data: User ) {
    return this.http.post<User>( `${this.baseUrl}/user`, data );
  }

  logout() {
    localStorage.clear();
    this.user$.next( {} as User );
  }

  validatToken() {
    const token = localStorage.getItem( 'token' ) || '';
    this.user$.next( JSON.parse( localStorage.getItem( 'user' )! ) );
    if ( token.length > 0 ) {
      return of( true );
    } else {
      return of( false );
    }
  }

}
