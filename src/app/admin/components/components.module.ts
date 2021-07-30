import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveItemComponent } from './remove-item/remove-item.component';
import { MaterialModule } from '../../material/material.module';



@NgModule( {
  declarations: [
    RemoveItemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    RemoveItemComponent
  ]
} )
export class ComponentsModule { }
