import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonajesRoutingModule } from './personajes-routing.module';
import { MainPersonajesComponent } from './main-personajes/main-personajes.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CardPersonajeComponent } from './components/card-personaje/card-personaje.component';
import { OptionsComponent } from './components/options/options.component';
import { SearchComponent } from './components/search/search.component';
import { DetailPersonajeComponent } from './components/detail-personaje/detail-personaje.component';


@NgModule( {
  declarations: [
    MainPersonajesComponent,
    CardPersonajeComponent,
    OptionsComponent,
    SearchComponent,
    DetailPersonajeComponent
  ],
  imports: [
    CommonModule,
    PersonajesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
} )
export class PersonajesModule { }
