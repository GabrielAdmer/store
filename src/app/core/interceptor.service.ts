import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable( { providedIn: 'root' } )
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {

    const token = localStorage.getItem( 'token' )!;

    const headers = new HttpHeaders().
      set( "Authorization", `Bearer ${token}` );

    const reqClone = req.clone( {
      headers
    } );

    return next.handle( reqClone );
  }


}
