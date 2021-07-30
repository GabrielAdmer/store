import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { retry } from 'rxjs/operators';

@Component( {
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: [ './basicos.component.scss' ]
} )
export class BasicosComponent implements OnInit {

  myForm: FormGroup = this.fb.group( {
    fullName: this.fb.group( {
      name: [ 'name', [ Validators.required, Validators.minLength( 10 ) ] ],
      lastName: [ 'lastname', [ Validators.required ] ]
    } ),

    startDate: [ new Date(), [ Validators.required ] ],
    endDate: [ new Date(), [ Validators.required ] ],

    mySelect: [ , [ Validators.required ] ],
    myRadio: [ 'futbol', [ Validators.required ] ],
    myCheckPreferences: [ , [ Validators.required ] ],
  } );

  get name() {
    return this.myForm.get( 'fullName' )?.get( 'name' );
  }

  get lastName() {
    return this.myForm.get( 'fullName' )?.get( 'lastName' );
  }

  get myCheckPreferences() {
    return this.myForm.get( 'myCheckPreferences' );
  }

  get startDate() {
    return this.myForm.get( 'startDate' );
  }

  get endDate() {
    return this.myForm.get( 'endDate' );
  }

  get mySelect() {
    return this.myForm.get( 'mySelect' );
  }

  get myRadio() {
    return this.myForm.get( 'myRadio' );
  }

  get isNameFieldInvalid() {
    return this.myForm.touched && this.myForm.invalid;
  }

  get isNameFieldValid() {
    return this.myForm.touched && this.myForm.valid;
  }

  selectData = [
    { name: "php", id: 1 },
    { name: "java", id: 2 },
    { name: "css", id: 3 },
    { name: "c#", id: 4 },
    { name: "azure", id: 5 },
    { name: "aws", id: 6 },


  ];

  radioData = [
    { name: "futbol", id: 1 },
    { name: "voley", id: 2 },
    { name: "tenis", id: 3 }
  ];
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // this.myField.valueChanges.subscribe( resp => this.myField.setValue( resp ) );
  }

  checkChangesHangle( event: any ) {
    const e = ( event.target ) as HTMLInputElement;
    const preferences: FormArray = this.myCheckPreferences as FormArray;

    if ( e.checked ) {
      preferences.push( new FormControl( e.value ) );
    } else {
      const index = preferences.controls.findIndex( control => control.value === e.value );
      preferences.removeAt( index );
    }

  };

  printForm() {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log( this.myForm.value );
  }

}
