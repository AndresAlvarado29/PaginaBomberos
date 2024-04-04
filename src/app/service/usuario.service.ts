import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth'
import { Firestore, collectionData, deleteDoc, setDoc } from '@angular/fire/firestore';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { Usuario } from '../domain/Usuario';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
userData:any;
usuarioRef= collection(this.firestore, 'Usuario');
  constructor(private auth: Auth, private firestore: Firestore, private router: Router) { 
    this.auth.onAuthStateChanged
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
  async register({email,password, usuario}:any){
    const infoUsuario = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
      ).then((usuarioaFirebase)=>{
        return usuarioaFirebase;
      });
      console.log(infoUsuario.user.uid)
      const usuarioRefC = doc(this.firestore,`Usuario/${infoUsuario.user.uid}`)
      const usuarioPlano = usuario.toJSON()
      return setDoc(usuarioRefC, usuarioPlano);
  }
  login({email,password}:any){
  this.auth.onAuthStateChanged(user=>{
      if(user){
        this.userData=user;
        console.log(this.userData)
        console.log("el rol que tiene es de:",this.userData.rol, " y el uid es:" , this.userData.uid)
        if(this.userData.rol==="usuario"){
          this.router.navigate(['/'])
        }else if(this.userData.rol==="administrador"){
          this.router.navigate(['paginas/menu'])
        }
      }
    })
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  logout(){
    return signOut(this.auth);
  }
  loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
}
