import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth'
import { signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private auth: Auth) { }

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
