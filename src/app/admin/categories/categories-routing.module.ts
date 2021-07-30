import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesModule } from './categories.module';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  {
    path: "lista",
    component: CategoriesComponent
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class CategoriesRoutingModule { }
