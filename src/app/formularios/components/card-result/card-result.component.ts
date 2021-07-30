import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component( {
  selector: 'app-card-result',
  templateUrl: './card-result.component.html',
  styleUrls: [ './card-result.component.scss' ]
} )
export class CardResultComponent implements OnInit {

  @Input() field!: AbstractControl;

  constructor() { }

  ngOnInit(): void {
  }

}
