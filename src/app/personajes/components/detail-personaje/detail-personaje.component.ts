import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Result } from '../../../models/character.model';

@Component( {
  selector: 'app-detail-personaje',
  templateUrl: './detail-personaje.component.html',
  styleUrls: [ './detail-personaje.component.scss' ]
} )
export class DetailPersonajeComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DetailPersonajeComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: Result
  ) { }

  ngOnInit(): void {
  }

}
