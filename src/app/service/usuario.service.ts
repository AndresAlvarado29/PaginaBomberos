import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth'
import { Firestore, collectionData, deleteDoc } from '@angular/fire/firestore';
import { signOut } from 'firebase/auth';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { Usuario } from '../domain/Usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
usuarioRef= collection(this.firestore, 'Usuario')
  constructor(private auth: Auth, private firestore: Firestore) { }
  save(usuario: Usuario){
    const usuarioPlano = usuario.toJSON()
    return addDoc(this.usuarioRef, usuarioPlano);
  }
  update(uid: string,data:any){
    const usuarioRefU = doc(this.firestore,`Usuario/${uid}`)
    return updateDoc(usuarioRefU,data)
  }
  delete(uid: string){
    const usuarioRefU = doc(this.firestore,`Usuario/${uid}`)
    return deleteDoc(usuarioRefU)
  }
  getAll(): Observable<Usuario[]>{
    console.log(collectionData(this.usuarioRef,{idField: 'uid'})as Observable<Usuario[]>)
    return collectionData(this.usuarioRef,{idField: 'uid'})as Observable<Usuario[]>
  }
  register({email,password}:any){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
  login({email,password}:any){
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  logout(){
    return signOut(this.auth);
  }
}
