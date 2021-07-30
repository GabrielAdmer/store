import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductosService } from '../../../core/admin/productos.service';

@Component( {
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: [ './detail-product.component.scss' ]
} )
export class DetailProductComponent implements OnInit {

  private suscriptions = new Subscription();

  constructor(
    private productosService: ProductosService
  ) { }

  ngOnInit(): void { }

  getAllProducts() {
    this.suscriptions.add( this.productosService.products$.subscribe( console.log ) );
  }

}
