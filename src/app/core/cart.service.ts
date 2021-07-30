import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductCart, Product } from '../models/product.model';

@Injectable( {
  providedIn: 'root'
} )
export class CartService {

  cart$: BehaviorSubject<ProductCart[]> = new BehaviorSubject<ProductCart[]>( [] );
  cart: ProductCart[] = [];

  constructor() {
    this.cart = JSON.parse( localStorage.getItem( 'cart' )! ) || [];
    this.cart$.next( this.cart );
  }

  addCarrito( data: Product ) {
    let newProductCarrito: ProductCart = { ...data, cuantity: 1 };
    this.cart.push( newProductCarrito );
    localStorage.setItem( 'cart', JSON.stringify( this.cart ) );
    this.cart$.next( this.cart );
  }

  deleteCarrito( index: number ) {
    this.cart = this.cart.filter( item => item.id !== index );
    localStorage.setItem( 'cart', JSON.stringify( this.cart ) );
    this.cart$.next( this.cart );
  }
}
