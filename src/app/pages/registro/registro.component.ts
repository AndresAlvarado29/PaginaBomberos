import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Usuario } from 'src/app/domain/Usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  usuario: Usuario = new Usuario();
constructor(private router: Router, private app:AppComponent, private servicioUsuario: UsuarioService){}
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
      this.servicioUsuario.register({ email: usuario.correo, password: usuario.contrasena,usuario: usuario }).then(()=>{
        console.log("Usuario Registrado");
        this.router.navigate(['paginas/sesion']);
      }).catch(error=> console.log(error)); 
  }
}
