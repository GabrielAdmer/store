import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component( {
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.scss' ]
} )
export class SearchComponent implements OnInit {

  @Input() serchName!: FormControl;
  @Output() onPalabra: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.serchName.valueChanges.pipe(
      debounceTime( 500 ),
    ).subscribe( resp => this.onPalabra.emit( resp ) );
  }

}
