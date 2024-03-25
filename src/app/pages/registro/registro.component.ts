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
    const email= usuario.correo
    const contra= usuario.contrasena
    this.servicioUsuario.register({email,contra});
    this.crear(usuario);
  }
  crear(usuario: Usuario){
    this.servicioUsuario.save(usuario);
    this.usuario= new Usuario();
  }
}
