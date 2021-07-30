import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/core/auth.service';

@Injectable( {
  providedIn: 'root'
} )
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService, private router: Router ) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean> | boolean {
    return this.authService.validatToken().pipe(
      tap( valid => {
        if ( !valid ) {
          this.router.navigateByUrl( '/auth/login' );
        }
      } )
    );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[] ): Observable<boolean> | boolean {
    return this.authService.validatToken().pipe(
      tap( valid => {
        if ( !valid ) {
          this.router.navigateByUrl( '/auth' );
        }
      } )
    );
  }
}
