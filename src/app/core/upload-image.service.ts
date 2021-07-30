import { ElementRef, Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable( {
  providedIn: 'root'
} )
export class UploadImageService {

  nameFile: string = '';
  msgError: string = '';
  urlImage$ = new BehaviorSubject<string>( '' );
  uploadPercent!: Observable<number | undefined>;

  archivosValido: string[] = [ 'png', 'jpg', 'jpeg' ];
  constructor(
    private storage: AngularFireStorage
  ) { }

  uploadImage( e: Event, fiel: ElementRef<HTMLInputElement> ): Observable<any> | void {
    this.nameFile = fiel.nativeElement.value;
    const event = ( e.target as HTMLInputElement );

    const image = event.files![ 0 ];
    const extensionName = image.name.split( '.' )[ 1 ];

    if ( !this.archivosValido.includes( extensionName ) ) {
      this.msgError = 'archivo no vaido';
      return;
    }

    const name = `${image.name}`;
    this.msgError = '';

    const ref = this.storage.ref( name );
    const task = this.storage.upload( name, image );

    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe( finalize( () => {
      const urlImage = ref.getDownloadURL();
      urlImage.subscribe( url => {
        this.urlImage$.next( url );
      } );
    } ) ).subscribe();

  };

  private validarFile( value: string ) {
    if ( !this.archivosValido.includes( value ) ) {
      this.msgError = 'archivo no vaido';
      return;
    }
  }
}
