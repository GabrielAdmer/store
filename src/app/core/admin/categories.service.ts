import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable( {
  providedIn: 'root'
} )
export class CategoriesService {

  private baseUrl = environment.apiStore;

  public categories$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>( [] );
  private categories: Category[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getAllCategories() {

    if ( this.categories.length === 0 ) {
      this.http.get<Category[]>( `${this.baseUrl}/category` )
        .pipe(
          tap( resp => {
            this.categories$.next( resp );
            this.categories = resp;
          } )
        ).subscribe();
    }
  }

  private refreshAllCategories() {

    this.http.get<Category[]>( `${this.baseUrl}/category` )
      .pipe(
        tap( resp => {
          this.categories$.next( resp );
          this.categories = resp;
        } )
      ).subscribe();

  }

  createCategory( data: Category ) {
    this.http.post<Category>( `${this.baseUrl}/category`, data ).subscribe( () => this.refreshAllCategories() );
  };

  updateCategory( changes: Category, id: number ) {
    this.http.put<Category>( `${this.baseUrl}/category/${id}`, changes ).subscribe( () => this.refreshAllCategories() );
  };

  removeItem( id: number ) {
    this.http.delete<any>( `${this.baseUrl}/category/${id}` ).subscribe( () => this.refreshAllCategories() );
  }
}
