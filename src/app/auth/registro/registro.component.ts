import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../core/auth.service';
import { Subscription } from 'rxjs';
import { MyValidators } from 'src/app/utils/validators/auth';
import { ErrorStateMatcher } from '@angular/material/core';

export class CrossFieldError implements ErrorStateMatcher {
  isErrorState( control: FormControl | null, form: FormGroupDirective | NgForm | null ): boolean {
    return control?.touched! && form?.hasError( 'no_matchpassword' )!;
  }
}

@Component( {
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: [ './registro.component.scss' ]
} )
export class RegistroComponent implements OnInit, OnDestroy {

  private suscriptions = new Subscription();
  errorStateMathcer = new CrossFieldError();

  myRegistro: FormGroup = this.fb.group( {
    name: [ 'juan', [ Validators.required, Validators.minLength( 3 ) ] ],
    email: [ 'juan@hotmail.com', [ Validators.required, Validators.email ] ],
    password: [ '123456', [ Validators.required, Validators.minLength( 5 ), MyValidators.validPassword ] ],
    confiPassword: [ , Validators.required ]
  }, {
    validators: MyValidators.matchPassword
  } );

  get name() {
    return this.myRegistro.get( 'name' );
  }

  get email() {
    return this.myRegistro.get( 'email' );
  }

  get password() {
    return this.myRegistro.get( 'password' );
  }

  get confiPassword() {
    return this.myRegistro.get( 'confiPassword' );
  }


  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.suscriptions.unsubscribe();
  }


  registroForm() {
    if ( this.myRegistro.invalid ) {
      this.myRegistro.markAllAsTouched();
      return;
    }
    const { confiPassword, ...resto } = this.myRegistro.value;
    const newUser: User = { ...resto };
    this.suscriptions.add( this.authService.registerUser( newUser ).subscribe(
      resp => {
        console.log( resp );
      },
      error => console.log( error )
    ) );


  }
}
