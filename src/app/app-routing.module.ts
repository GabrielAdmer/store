import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { MenuComponent } from './shared/menu/menu.component';
import { CartModule } from './cart/cart.module';

const routes: Routes = [
  {
    path: "",
    // canActivate: [ AuthGuard ],
    // canLoad: [ AuthGuard ],
    component: MenuComponent,
    children: [
      { path: "personajes", loadChildren: () => import( "./personajes/personajes.module" ).then( m => m.PersonajesModule ) },
      { path: "", redirectTo: "personajes", pathMatch: "full" }
    ],
  },
  {
    path: "",
    component: MenuComponent,
    children: [
      { path: "formularios", loadChildren: () => import( "./formularios/formularios.module" ).then( m => m.FormulariosModule ) },
      { path: "products", loadChildren: () => import( "./productos/productos.module" ).then( m => m.ProductosModule ) },
      { path: "cart", loadChildren: () => import( "./cart/cart.module" ).then( m => m.CartModule ) }
    ]
  },
  {
    path: "admin",
    component: NavigationComponent,
    children: [
      { path: "categories", loadChildren: () => import( './admin/categories/categories.module' ).then( m => m.CategoriesModule ) },
      { path: "products", loadChildren: () => import( './admin/products/products.module' ).then( m => m.ProductsModule ) }
    ]
  },

  { path: "auth", loadChildren: () => import( "./auth/auth.module" ).then( m => m.AuthModule ) },

  { path: "", redirectTo: "auth", pathMatch: "full" }
];

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule { }
