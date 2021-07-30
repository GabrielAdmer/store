import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component( {
  selector: 'app-remove-item',
  templateUrl: './remove-item.component.html',
  styleUrls: [ './remove-item.component.scss' ]
} )
export class RemoveItemComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RemoveItemComponent>,
    @Inject( MAT_DIALOG_DATA ) public item: any
  ) { }

  ngOnInit(): void {
    // console.log( this.item );
  }

  removeItem() {
    this.dialogRef.close( this.item.id );
  }

}
