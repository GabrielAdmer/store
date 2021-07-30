import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Result } from 'src/app/models/character.model';
import { DetailPersonajeComponent } from '../detail-personaje/detail-personaje.component';

@Component( {
  selector: 'app-card-personaje',
  templateUrl: './card-personaje.component.html',
  styleUrls: [ './card-personaje.component.scss' ]
} )
export class CardPersonajeComponent implements OnInit {

  @Input() personaje!: Result;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open( DetailPersonajeComponent, {
      width: '600px',
      data: this.personaje
    } );

  }

}
