import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.model';

@Component( {
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: [ './create.component.scss' ]
} )
export class CreateComponent implements OnInit {

  name = new FormControl( 'asdfadf', [ Validators.required, Validators.minLength( 5 ) ] );

  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
  ) { }

  ngOnInit(): void {
  }

  createCategory() {
    if ( this.name.invalid ) {
      return;
    }

    const newCategory: Category = { name: this.name.value };

    this.dialogRef.close( newCategory );
  }


}
