import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { EditComponent } from './components/edit/edit.component';
import { CreateComponent } from './components/create/create.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';


@NgModule( {
  declarations: [
    CategoriesComponent,
    EditComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
} )
export class CategoriesModule { }
