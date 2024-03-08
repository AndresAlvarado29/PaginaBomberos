import { Injectable } from '@angular/core';
import { Documento } from '../domain/Documento';
import { Firestore, collectionData, deleteDoc } from '@angular/fire/firestore';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
documentoRef = collection(this.firestore, 'documentos');
    constructor(private firestore: Firestore) { }
      save(documentos: Documento){
        const documentoPlano = documentos.toJSON()
        return addDoc(this.documentoRef, documentoPlano);
  }
  update(uid: string,data:any): Promise<void>{
    const documentoRefU = doc(this.documentoRef,`documentos/${uid}`)
    return updateDoc(documentoRefU,data)
   }
   delete(uid: string){
    const documentoRefD = doc(this.firestore,`documentos/${uid}`)
    return deleteDoc(documentoRefD)
   }
   getAll(): Observable<Documento[]>{
    return collectionData(this.documentoRef,{idField: 'uid'}) as Observable<Documento[]>
   }
}
