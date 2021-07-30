import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../guards/auth.guard';
import { RegistroComponent } from './registro/registro.component';
import { MenuComponent } from '../shared/menu/menu.component';

const routes: Routes = [
  {
    path: "",
    component: MenuComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "registro", component: RegistroComponent }

    ]
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class AuthRoutingModule { }
