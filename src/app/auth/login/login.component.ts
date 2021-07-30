import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { Login, User } from 'src/app/models/user.model';
import { AuthService } from '../core/auth.service';

import { Router } from '@angular/router';


@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [ `@import '/src/scss/material';` ]
} )
export class LoginComponent implements OnInit, OnDestroy {

  private suscriptions = new Subscription();
  public users: User[] = [];

  //**** my form de login **/
  public myLogin: FormGroup = this.fb.group( {
    email: [ 'Mabel@hotmail.com', [ Validators.required, Validators.email ] ],
    password: [ '123445', [ Validators.required, Validators.minLength( 5 ) ] ]
  } );

  get email() {
    return this.myLogin.get( 'email' );
  }

  get password() {
    return this.myLogin.get( 'password' );
  }

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getAllUsers();
    this.getAllUsers();
  };

  ngOnDestroy(): void {
    this.suscriptions.unsubscribe();
  };

  getAllUsers(): void {
    this.suscriptions.add( this.authService.users$.subscribe( users => {
      this.users = users;
      console.log( this.users );
    } ) );
  };

  login() {
    const data: Login = { ...this.myLogin.value };
    this.suscriptions.add( this.authService.loginUser( data ).subscribe( () => {
      this.router.navigateByUrl( 'personajes' );
    } ) );
  }

}
