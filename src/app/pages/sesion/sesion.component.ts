import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Usuario } from 'src/app/domain/Usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.scss']
})
export class SesionComponent {
  hide = true;
  usuario = new Usuario()
  constructor(private router: Router, private app: AppComponent, private usuarioServicio: UsuarioService){}
  
  ngOnInit(){
    setTimeout(() => {
      this.visualizar() // Realizar el cambio de forma asincrónica
    });
  }
    visualizar() {
      const currentUrl = this.router.url;
      if (currentUrl == '/paginas/sesion') {
        this.app.ocultar()
      }
    }
    iniciar(usuario: Usuario){
      this.usuarioServicio.login({email: usuario.correo, password: usuario.contrasena}).then(()=>
      {
        console.log("sesion iniciada")
        this.router.navigate(['paginas/menu'])
      }).catch(error=> console.log(error));
    }
    loginGoogle(){
      this.usuarioServicio.loginWithGoogle().then(()=>{
        console.log("sesion iniciada")
        this.router.navigate(['paginas/menu'])
      }).catch(error=>console.log(error))
    }
}
