import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { CartService } from '../../core/cart.service';
import { Subscription } from 'rxjs';
import { ProductCart } from 'src/app/models/product.model';

@Component( {
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: [ './cart.component.scss' ]
} )
export class CartComponent implements OnInit {

  suscriptions = new Subscription();
  cart: ProductCart[] = [];

  myForm: FormGroup = this.fb.group( {
    name: [ 'asdf', [ Validators.required ] ],
    address: this.fb.array( [] )
  } );

  get address() {
    return this.myForm.get( 'address' ) as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getAllProductCart();
    console.log( this.cart );
  }

  ngOnDestroy(): void {
    this.suscriptions.unsubscribe();
  }

  getAllProductCart() {
    this.suscriptions.add( this.cartService.cart$.subscribe( resp => this.cart = resp ) );
  }

  addAdreessField() {
    this.address.push( this.createAdreesField() );
  }

  printForm() {
    console.log( this.myForm.value );
  }

  private createAdreesField() {
    return this.fb.group( {
      zip: [ '', Validators.required ],
      text: [ '', Validators.required ]
    } );
  }

  deleteItemCart( index: number ) {
    this.cartService.deleteCarrito( index );
  }

}
