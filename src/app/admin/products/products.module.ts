import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { EditarComponent } from './components/editar/editar.component';
import { CrearComponent } from './components/crear/crear.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './components/details/details.component';


@NgModule( {
  declarations: [
    ProductsComponent,
    EditarComponent,
    CrearComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
} )
export class ProductsModule { }
