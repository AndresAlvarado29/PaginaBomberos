import { Injectable, inject } from '@angular/core';
import { Documento } from '../domain/Documento';
import { Firestore, collectionData, deleteDoc } from '@angular/fire/firestore';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage'
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class DocumentoService {
  uidBusqueda: string = '';
  uploadProgress$!: Observable<number>
  downloadUrl$!: Observable<string>
  private storage: Storage = inject(Storage);
  documentoRef = collection(this.firestore, 'Documento');
  constructor(private firestore: Firestore) { }
  save(documentos: Documento) {
    const documentoPlano = documentos.toJSON()
    return addDoc(this.documentoRef, documentoPlano);
  }
  update(uid: string, data: any) {
    const documentoRefU = doc(this.firestore, `Documento/${uid}`)
    return updateDoc(documentoRefU, data)
  }
  delete(uid: string) {
    const documentoRefD = doc(this.firestore, `Documento/${uid}`)
    return deleteDoc(documentoRefD)
  }
  getAll(): Observable<Documento[]> {
    console.log(collectionData(this.documentoRef, { idField: 'uid' }) as Observable<Documento[]>)
    return collectionData(this.documentoRef, { idField: 'uid' }) as Observable<Documento[]>
  }
  async subirArchivo(file: File,onProgress:(progress:number)=>void, documento: Documento) {
    const filePath = `archivos/${file.name}`;
    const fileRef = ref(this.storage, filePath);
    const uploadFile = uploadBytesResumable(fileRef, file);
    uploadFile.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress);
        console.log('Progreso de la carga:', progress)
      },
      (error) => {
        console.error('Error al cargar el archivo:', error)
      },
      async () => {
        console.log('El archivo se subió exitosamente!');
        const url = await getDownloadURL(fileRef);
        console.log('URL del archivo', url);
        documento.archivo = url; // Asignar la URL al campo archivo del documento
        console.log('documento', documento);
        // Guardar el documento una vez que se haya subido el archivo y se tenga la URL
        if (!documento.uid) {
          const response = this.save(documento);
          console.log("Documento creado:", response);
        } else {
          const response = this.update(documento.uid, documento)
          console.log("Documento actualizado", response)
        }
        const inputElement = document.getElementById('inputArchivo') as HTMLInputElement;
        if (inputElement) {
          inputElement.value = ''; // Limpiar el valor del input
        }
      });
  }
  buscarDocumentoPorUid(): void {

  }
}
