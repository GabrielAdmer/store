import { Component, OnInit, Inject, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
import { UploadImageService } from '../../../../core/upload-image.service';
import { Observable, Subscription } from 'rxjs';
import { CategoriesService } from '../../../../core/admin/categories.service';
import { Category } from '../../../../models/category.model';

@Component( {
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: [ './editar.component.scss' ]
} )
export class EditarComponent implements OnInit, OnDestroy {

  private suscriptions = new Subscription();
  @ViewChild( 'asInputFile' ) field!: ElementRef<HTMLInputElement>;
  nameFile: string = '';
  msgError: string = '';
  uploadPercent!: Observable<number | undefined>;
  categories: Category[] = [];

  myForm: FormGroup = this.fb.group( {
    name: [ 'nuevo', [ Validators.required, Validators.minLength( 3 ) ] ],
    description: [ 'bla bla bla', [ Validators.required ] ],
    price: [ 12.3, [ Validators.required, Validators.min( 2 ) ] ],
    stock: [ 12, [ Validators.required, Validators.min( 0 ) ] ],
    image: [ 'url', [ Validators.required ] ],
    categoriesIds: [ , [ Validators.required ] ]
  } );

  get name() {
    return this.myForm.get( 'name' );
  }

  get description() {
    return this.myForm.get( 'description' );
  }

  get price() {
    return this.myForm.get( 'price' );
  }

  get stock() {
    return this.myForm.get( 'stock' );
  }

  get image() {
    return this.myForm.get( 'image' );
  }


  get categoriesIds() {
    return this.myForm.get( 'categoriesIds' );
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarComponent>,
    @Inject( MAT_DIALOG_DATA ) public producto: Product,
    private uploadImageService: UploadImageService,
    private categoriesService: CategoriesService
  ) {

  }

  ngOnInit(): void {
    this.categoriesService.getAllCategories();
    this.getAllCategories();
    const { categories, ...resto } = this.producto;
    let categoriesIds = categories.map( item => item.id );
    this.myForm.reset( { ...resto, categoriesIds } );
  }

  ngOnDestroy(): void {
    this.suscriptions.unsubscribe();
  }

  getAllCategories() {
    this.suscriptions.add( this.categoriesService.categories$.subscribe( resp => this.categories = resp ) );
  }


  uploadFile( e: Event ) {
    this.uploadImageService.uploadImage( e, this.field );
    this.nameFile = this.uploadImageService.nameFile;
    this.msgError = this.uploadImageService.msgError;
    this.uploadPercent = this.uploadImageService.uploadPercent;
    this.suscriptions.add( this.uploadImageService.urlImage$.subscribe( resp => this.image?.setValue( resp ) ) );
  }

  updateProducto() {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.dialogRef.close( this.myForm.value );
  }
}
