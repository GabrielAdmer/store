import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPersonajesComponent } from './main-personajes/main-personajes.component';

const routes: Routes = [
  {
    path: "",
    component: MainPersonajesComponent
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class PersonajesRoutingModule { }
