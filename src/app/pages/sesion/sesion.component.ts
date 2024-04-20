import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Usuario } from 'src/app/domain/Usuario';
import { EncriptacionService } from 'src/app/service/encriptacion.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { keySecret } from 'src/llave/keySecret';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.scss']
})
export class SesionComponent {
  hide = true;
  private llave= keySecret.key;
  usuario = new Usuario()
  constructor(private router: Router, private app: AppComponent, private usuarioServicio: UsuarioService, private encriptar: EncriptacionService){}
  
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
      const encriptado = this.encriptar.set(this.llave,usuario.contrasena)
      this.usuarioServicio.login({email: usuario.correo, password: encriptado}).then(()=>
      {
        setTimeout(() => {
          this.app.inicioS()
          this.app.aparecer()
        });
      }).catch(error=> console.log(error));
    }
    loginGoogle(){
      this.usuarioServicio.loginWithGoogle().then(()=>{
        console.log("sesion iniciada")
        this.router.navigate(['paginas/menu'])
      }).catch(error=>console.log(error))
    }
}
