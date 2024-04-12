import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth'
import { Firestore, collectionData, deleteDoc, setDoc, docData } from '@angular/fire/firestore';
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
    this.autentificacionEstadoUsuario()
  }
  autentificacionEstadoUsuario(){
    this.auth.onAuthStateChanged(user=>{
      if(user){
        this.getUserData(user.uid)
        console.log("ingreso un usuario")
      }
    });
  }
  getUserData(uid:string){
    const userDoc = doc(this.firestore, `Usuario/${uid}`)
    docData(userDoc).subscribe(userData=>{
      this.userData= userData;
      this.redirectUserByRole();
    })
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
      console.log('contra es la siguiente:')
      
      const usuarioPlano = usuario.toJSON()
      return setDoc(usuarioRefC, usuarioPlano);
  }
  login({email,password}:any){
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  logout(){
    return signOut(this.auth);
  }
  loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
  redirectUserByRole(){
    if(this.userData && this.userData.rol){
      if(this.userData.rol === 'usuario'){
        this.router.navigate(['/']);
      }else if (this.userData.rol === 'administrador'){
        this.router.navigate(['/'], { queryParams: { role: 'role' }});
      }
    }
  }
}
