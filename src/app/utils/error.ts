import { HttpResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

export function handleHttpResponseError( error: HttpResponse<any> ): Observable<never> {
  return throwError( 'Mi mensaje de error' );
};