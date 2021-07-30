import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicosComponent } from './pages/basicos/basicos.component';
import { AvanazadoComponent } from './pages/avanazado/avanazado.component';

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "basico", component: BasicosComponent },
      { path: "avanzado", component: AvanazadoComponent }
    ]
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class FormulariosRoutingModule { }
