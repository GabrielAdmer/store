import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/core/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CartService } from '../../core/cart.service';
import { map } from 'rxjs/operators';

@Component( {
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: [ './menu.component.scss' ]
} )
export class MenuComponent implements OnInit {

  public subscriptions: Subscription = new Subscription();
  public user$!: Observable<User>;
  lenght: number = 0;
  cartLength: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    public OverlayContainer: OverlayContainer,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartQuamtity();
    this.getUser();
    console.log( 'hola' );
    this.subscriptions.add( this.user$.subscribe( resp => {
      this.lenght = ( Object.keys( resp ).length );
    } ) );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getUser() {
    this.user$ = this.authService.user;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl( '/auth/login' );
  }

  cartQuamtity() {
    this.subscriptions.add( this.cartService.cart$.pipe(
      map( resp => resp.length )
    ).subscribe( resp => this.cartLength = resp ) );
  }



}
