import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { NavigationComponent } from './navigation/navigation.component';





@NgModule( {
  declarations: [
    MenuComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,


  ],
  exports: [
    MenuComponent,
    NavigationComponent
  ]
} )
export class SharedModule { }
