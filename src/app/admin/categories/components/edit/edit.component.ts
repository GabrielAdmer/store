import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.model';

@Component( {
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: [ './edit.component.scss' ]
} )
export class EditComponent implements OnInit {

  name = new FormControl( 'update', [ Validators.required ] );

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject( MAT_DIALOG_DATA ) public category: Category
  ) { }

  ngOnInit(): void {
    this.name.reset( this.category.name );
  }

  editCategory() {
    if ( this.name.invalid ) {
      return;
    }
    const changes: Category = { name: this.name.value };
    this.dialogRef.close( changes );
  };

}
