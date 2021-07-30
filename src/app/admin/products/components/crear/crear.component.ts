import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/core/admin/categories.service';
import { Subscription, Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadImageService } from '../../../../core/upload-image.service';

@Component( {
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: [ './crear.component.scss' ]
} )
export class CrearComponent implements OnInit, OnDestroy {

  @ViewChild( 'asInputFile' ) fiel!: ElementRef<HTMLInputElement>;
  nameFile: string = '';
  msgError: string = '';
  uploadPercent!: Observable<number | undefined>;


  private suscriptions = new Subscription();
  categories: Category[] = [];

  myForm: FormGroup = this.fb.group( {
    name: [ , [ Validators.required, Validators.minLength( 3 ) ] ],
    description: [ , [ Validators.required ] ],
    price: [ , [ Validators.required, Validators.min( 2 ) ] ],
    stock: [ , [ Validators.required, Validators.min( 0 ) ] ],
    image: [ , [ Validators.required ] ],
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
    public dialogRef: MatDialogRef<CrearComponent>,
    private categoriesService: CategoriesService,
    private uploadImageService: UploadImageService
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

  uploadFile( e: Event ) {
    this.uploadImageService.uploadImage( e, this.fiel );
    this.nameFile = this.uploadImageService.nameFile;
    this.msgError = this.uploadImageService.msgError;
    this.uploadPercent = this.uploadImageService.uploadPercent;
    this.suscriptions.add( this.uploadImageService.urlImage$.subscribe( resp => this.image?.setValue( resp ) ) );
  }

  createProduct() {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.dialogRef.close( this.myForm.value );

  }

}
