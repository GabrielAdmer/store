import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { DetailProductComponent } from './pages/detail-product/detail-product.component';


@NgModule({
  declarations: [
    ProductsComponent,
    DetailProductComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
