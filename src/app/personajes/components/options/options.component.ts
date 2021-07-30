import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component( {
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: [ './options.component.scss' ]
} )
export class OptionsComponent implements OnInit {

  @Input() page: number = 1;
  @Output() onCambiarPagina: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  cambiarPagina( value: number ) {
    this.onCambiarPagina.emit( value );
  }

}
