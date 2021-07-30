import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductosService } from '../../../core/admin/productos.service';
import { Subscription, Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { CrearComponent } from '../components/crear/crear.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditarComponent } from '../components/editar/editar.component';
import { RemoveItemComponent } from '../../components/remove-item/remove-item.component';
import { DetailsComponent } from '../components/details/details.component';

@Component( {
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: [ './products.component.scss' ]
} )
export class ProductsComponent implements OnInit, OnDestroy {

  private suscriptions = new Subscription();
  public products: Product[] = [];
  public msgError$!: Observable<string>;

  constructor(
    private productosService: ProductosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.productosService.getAllProducts();
    this.getAllProducts();
  }

  ngOnDestroy(): void {
    this.suscriptions.unsubscribe();
  }

  getAllProducts() {
    this.suscriptions.add( this.productosService.products$.subscribe( resp => this.products = resp ) );
  }


  openDialogCreate() {
    const dialogRef = this.dialog.open( CrearComponent, {
      width: '450px',
      disableClose: true
    } );

    this.suscriptions.add( dialogRef.afterClosed().subscribe( result => {
      if ( result === false ) return this.openSnackBar( 'peticion cancelada' );

      this.productosService.createProduct( result );
      this.productosService.msgError$.subscribe( resp => resp ? this.openSnackBar( resp ) : '' );
      this.openSnackBar( 'Creado con exito' );

    } ) );
  }

  openDialogUpdate( data: Product ) {
    const dialoRef = this.dialog.open( EditarComponent, {
      width: '450px',
      disableClose: true,
      data
    } );

    this.suscriptions.add( dialoRef.afterClosed().subscribe( result => {
      console.log( result );
      if ( result === false ) return this.openSnackBar( 'peticion cancelada' );
      this.productosService.updateProduct( result, data.id! );
      this.openSnackBar( 'editado exitosamente' );
    } ) );

  }

  openDilaogRemove( data: Product ) {
    const dialogRef = this.dialog.open( RemoveItemComponent, {
      width: '450px',
      data
    } );
    this.suscriptions.add( dialogRef.afterClosed().subscribe( result => {
      if ( result === false ) return this.openSnackBar( 'peticion cancelada' );
      this.productosService.removeProduct( result );
      this.openSnackBar( 'eliminado exitosamente' );
    } ) );

  }

  openDialogDetail( data: Product ) {
    const dialogRef = this.dialog.open( DetailsComponent, {
      width: '600px',
      data: data
    } );
  }

  openSnackBar( message: string ) {
    this._snackBar.open( message, 'Splash', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000
    } );
  }


}
