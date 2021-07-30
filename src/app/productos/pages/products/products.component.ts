import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductosService } from 'src/app/core/admin/productos.service';
import { Product } from 'src/app/models/product.model';
import { CartService } from '../../../core/cart.service';

@Component( {
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: [ './products.component.scss' ]
} )
export class ProductsComponent implements OnInit, OnDestroy {

  private suscriptions = new Subscription();
  public products: Product[] = [];

  constructor(
    private productoService: ProductosService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.productoService.getAllProducts();
    this.getAllProducts();
  }

  ngOnDestroy(): void {
    this.suscriptions.unsubscribe();
  }

  getAllProducts() {
    this.suscriptions.add( this.productoService.products$.subscribe( products => this.products = products ) );
  }

  addCarrito( product: Product ) {
    this.cartService.addCarrito( product );
  }

}
