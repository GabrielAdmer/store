import { AbstractControl } from '@angular/forms';

export class MyValidators {

  static validPassword( control: AbstractControl ) {
    const value = control.value;

    if ( !containsNumber( value ) ) {
      return { invalid_password: true };
    }
    return null;
  }

  static matchPassword( control: AbstractControl ) {
    const password = control.get( 'password' )?.value;
    const confirm = control.get( 'confiPassword' )?.value;
    console.log( password, confirm );
    if ( password !== confirm ) {
      return { no_matchpassword: true };
    }
    return null;

  }

}

function isNumber( value: string ) {
  return !isNaN( parseInt( value, 10 ) );
}

function containsNumber( value: string ): boolean {
  return value.split( '' ).some( isNumber );
}