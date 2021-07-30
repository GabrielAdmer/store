import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Product, CreateProduct } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';

@Injectable( {
  providedIn: 'root'
} )
export class ProductosService {

  private baseUrl = environment.apiStore;
  public msgError$ = new BehaviorSubject<string>( '' );

  public products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>( [] );
  private products: Product[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    if ( this.products.length === 0 ) {
      this.http.get<Product[]>( `${this.baseUrl}/product` ).subscribe( products => {
        this.products$.next( products );
        this.products = products;
      } );
    }
  }

  private refreshData() {
    this.http.get<Product[]>( `${this.baseUrl}/product` ).subscribe( products => {
      this.products$.next( products );
      this.products = products;
    } );
  }

  createProduct( data: CreateProduct ) {
    this.http.post<Product>( `${this.baseUrl}/product`, data ).subscribe(
      () => {
        this.refreshData();
        this.msgError$.next( '' );
      },
      () => this.msgError$.next( 'nombre duplicado' )
    );
  }

  updateProduct( changes: CreateProduct, id: number ) {
    this.http.put<Product>( `${this.baseUrl}/product/${id}`, changes ).subscribe( () => this.refreshData() );
  }

  removeProduct( id: number ) {
    this.http.delete<any>( `${this.baseUrl}/product/${id}` ).subscribe( () => this.refreshData() );
  }

}
