import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage'

@Injectable({
  providedIn: 'root'
})
export class ArchivoClienteService {
  uidBusqueda: string = '';
  uploadProgress$!: Observable<number>;
  downloadUrl$!: Observable<string>;
  private storage: Storage = inject(Storage);
  documentoRef = collection(this.firestore, 'ArchivoCliente');

  constructor(private firestore: Firestore) { }

  async subirArchivo(file: File, onProgress:(progress:number)=>void): Promise<string> {
    const filePath = `archivosParaSolicitudes/${Date.now()}_${file.name}`;
    const fileRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(fileRef, file);
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress);
          console.log('Progreso de la carga:', progress);
        },
        (error) => {
          console.error('Error al cargar el archivo:', error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          }).catch((error) => {
            reject(error);
          });
        }
      );
    });
  }
  async subirArchivos(files: File[],onProgress:(progress:number)=>void): Promise<string[]> {
    const uploadPromises = files.map(file => {
      return new Promise<string>((resolve, reject) => {
        const filePath = `archivosParaSolicitudes/${Date.now()}_${file.name}`;
        const fileRef = ref(this.storage, filePath);
        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress(progress);
            console.log('Progreso de la carga:', progress);
          },
          (error) => {
            console.error('Error al cargar el archivo:', error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    });

    return Promise.all(uploadPromises);
  }
}
