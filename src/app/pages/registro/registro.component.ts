import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Usuario } from 'src/app/domain/Usuario';
import { EncriptacionService } from 'src/app/service/encriptacion.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { keySecret } from 'src/llave/keySecret';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  usuario: Usuario = new Usuario();
  private llave= keySecret.key
constructor(private router: Router, private app:AppComponent, private servicioUsuario: UsuarioService, private encriptacion: EncriptacionService){}
ngOnInit(){
  setTimeout(() => {
    this.visualizar() // Realizar el cambio de forma asincrónica
  });
}
  visualizar() {
    const currentUrl = this.router.url;
    if (currentUrl == '/paginas/registro') {
      this.app.ocultar()
    }
  }
  registrar(usuario: Usuario){
    const encrypted = this.encriptacion.set(this.llave, usuario.contrasena)
    usuario.contrasena=encrypted
      this.servicioUsuario.register({ email: usuario.correo, password: usuario.contrasena,usuario: usuario }).then(()=>{
        this.servicioUsuario.logout()
        console.log("Usuario Registrado");
        this.router.navigate(['paginas/sesion']);
      }).catch(error=> console.log(error)); 
  }
}
