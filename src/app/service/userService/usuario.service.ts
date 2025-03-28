import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth'
import { Firestore, collectionData, deleteDoc, setDoc, docData } from '@angular/fire/firestore';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { Usuario } from '../../domain/Usuario';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
userData:any;
usuarioRef= collection(this.firestore, 'Usuario');
  constructor(private auth: Auth, private firestore: Firestore, private router: Router) { 
    
  }
  autentificacionEstadoUsuario(){
    this.auth.onAuthStateChanged(user=>{
      if(user){
        this.getUserData(user.uid)
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
      const usuarioRefC = doc(this.firestore,`Usuario/${infoUsuario.user.uid}`) 
      const usuarioPlano = usuario.toJSON()
      return setDoc(usuarioRefC, usuarioPlano);
  }
  login({email,password}:any){
    this.router.navigate(['/']);
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  logout(){
    localStorage.removeItem('btnAdmin')
    console.log(localStorage)
    this.router.navigate(['/']);
    return signOut(this.auth);
  }
  loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
  redirectUserByRole(){
    console.log("ingreso de "+this.userData.rol)
    if(this.userData && this.userData.rol){
      if(this.userData.rol === 'usuario'){
        localStorage.removeItem('btnAdmin');
      }else if (this.userData.rol === 'administrador'){
        localStorage.setItem('btnAdmin','true')
        console.log(localStorage)
        this.router.navigate(['/'], { queryParams: { role: this.userData.rol }});
      }
    }
  }
}
