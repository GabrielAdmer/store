import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../../../core/admin/categories.service';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../components/create/create.component';
import { switchMap, tap } from 'rxjs/operators';
import { EditComponent } from '../components/edit/edit.component';
import { RemoveItemComponent } from '../../components/remove-item/remove-item.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component( {
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: [ './categories.component.scss' ]
} )
export class CategoriesComponent implements OnInit, OnDestroy {

  private suscriptions: Subscription = new Subscription();
  public categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.categoriesService.getAllCategories();
    this.getAllCategories();
  }

  ngOnDestroy(): void {
    this.suscriptions.unsubscribe();
  }


  getAllCategories() {
    this.suscriptions.add( this.categoriesService.categories$.subscribe( resp => this.categories = resp ) );
  }

  openDialogCreate() {
    const dialogRef = this.dialog.open( CreateComponent, {
      width: '450px',
      disableClose: true
    } );

    this.suscriptions.add( dialogRef.afterClosed().subscribe( result => {
      if ( result ) {
        this.categoriesService.createCategory( result );
        this.openSnackBar( 'Creado con exito' );
      }
    } ) );

  }

  openDialogUpdate( data: Category ) {
    const dialogRef = this.dialog.open( EditComponent, {
      width: '450px',
      disableClose: true,
      data
    } );

    this.suscriptions.add( dialogRef.afterClosed().subscribe( resp => {
      console.log( resp );
      if ( data.name === resp ) return;
      this.categoriesService.updateCategory( resp, data.id! );
      this.openSnackBar( 'Editado con exito' );
    } ) );

  }

  openDialogRemove( data: Category ) {
    const dialogRef = this.dialog.open( RemoveItemComponent, {
      width: '450px',
      disableClose: true,
      data
    } );

    this.suscriptions.add( dialogRef.afterClosed().subscribe( resp => {
      console.log( resp );
      if ( resp === false ) return;
      this.categoriesService.removeItem( resp );
      this.openSnackBar( 'Eliminado con exito' );

    } ) );
  }

  openSnackBar( message: string ) {
    this._snackBar.open( message, 'Splash', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000
    } );
  }
}