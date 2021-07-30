import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { PersonajesService } from '../../core/personajes.service';
import { Result } from '../../models/character.model';

@Component( {
  selector: 'app-main-personajes',
  templateUrl: './main-personajes.component.html',
  styleUrls: [ './main-personajes.component.scss' ]
} )
export class MainPersonajesComponent implements OnInit, OnDestroy {

  private suscriptions: Subscription = new Subscription();

  cargando$!: Observable<boolean>;
  msgError: string = '';
  personajes$!: Observable<Result[]>;
  page = 1;

  cambiarPage = new FormControl( '', [ Validators.required ] );
  searchName = new FormControl( '', [ Validators.required ] );

  constructor(
    private personajesService: PersonajesService
  ) {
  }

  ngOnDestroy(): void {
    this.suscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.page = JSON.parse( localStorage.getItem( 'page' )! ) || 1;
    this.personajesService.getPersonajes();
    this.cargando$ = this.personajesService.cargando$;
    this.getPersonajes();
  }

  getPersonajes() {
    this.personajes$ = this.personajesService.personajes$;
  }

  cambiarPagina( value: number ) {
    this.personajesService.cargando$.next( true );
    this.page += value;
    localStorage.setItem( 'page', JSON.stringify( this.page ) );
    this.personajesService.getPersonajes( this.page );
  }

  selecionarPage() {
    this.personajesService.cargando$.next( true );
    this.page = this.cambiarPage.value;
    localStorage.setItem( 'page', JSON.stringify( this.page ) );
    this.personajesService.getPersonajes( this.page );
    this.cambiarPage.reset();
  }

  serachNameApi( value: string ) {
    if ( value.length > 0 ) {
      this.personajesService.cargando$.next( true );
      this.suscriptions.add( this.personajesService.getFilterName( value ).subscribe(
        () => console.log( 'adf' ),
        error => {
          this.msgError = error;
          this.personajesService.cargando$.next( false );
        }
      ) );
      this.personajes$ = this.personajesService.personajes$;
    } else {
      this.msgError = '';
      this.personajesService.error$.next( false );
      this.getPersonajes();
    }
  }

}
