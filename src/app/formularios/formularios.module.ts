import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormulariosRoutingModule } from './formularios-routing.module';
import { BasicosComponent } from './pages/basicos/basicos.component';
import { AvanazadoComponent } from './pages/avanazado/avanazado.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardResultComponent } from './components/card-result/card-result.component';
import { MaterialModule } from '../material/material.module';


@NgModule( {
  declarations: [
    BasicosComponent,
    AvanazadoComponent,
    CardResultComponent
  ],
  imports: [
    CommonModule,
    FormulariosRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
} )
export class FormulariosModule { }
