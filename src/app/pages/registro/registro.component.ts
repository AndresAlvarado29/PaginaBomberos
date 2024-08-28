import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Usuario } from 'src/app/domain/Usuario';
import { EncriptacionService } from 'src/app/service/encriptacion.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  hide = true;
  usuario: Usuario = new Usuario();
  private llave= environment.key
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
  validateForm(): boolean {
    const nombreApellidoPattern = /^[a-zA-Z\s]+$/;
    if (!this.usuario.nombre || this.usuario.nombre.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Datos Faltantes',
        text: 'El campo nombre es obligatorio',
      });
      return false;
    }else if(!nombreApellidoPattern.test(this.usuario.nombre)){
      Swal.fire({
        icon: 'warning',
        title: 'Formulario Invalido',
        text: 'No ingrese números o signos especiales',
      }); 
      return false;
    }

    if (!this.usuario.apellido || this.usuario.apellido.trim() === '') {Swal.fire({
      icon: 'warning',
      title: 'Datos Faltantes',
      text: 'El campo apellido es obligatorio',
    });
    return false;
  }else if(!nombreApellidoPattern.test(this.usuario.apellido)){
    Swal.fire({
      icon: 'warning',
      title: 'Formulario Invalido',
      text: 'No ingrese numeros o signos especiales',
    }); 
    return false;
  }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!this.usuario.correo || !emailPattern.test(this.usuario.correo)) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario Invalido',
        text: 'Por favor, ingrese un correo electrónico válido.',
      }); 
      return false;
    }

    const phonePattern = /^\d{10}$/; 
    if (!this.usuario.celular || !phonePattern.test(this.usuario.celular)) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario Invalido',
        text: 'Por favor, ingrese un número de celular válido (10 dígitos).',
      }); 
      return false;
    }
    const passwordPattern = /^.{8,25}$/; 
    if (!this.usuario.contrasena || this.usuario.contrasena.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Registro invalido',
        text: 'El campo contraseña es obligatorio.',
      }); 
      return false;
    }else if(!passwordPattern.test(this.usuario.contrasena)){
      Swal.fire({
        icon: 'error',
        title: 'Registro invalido',
        text: 'La contraseña debe tener minimo 8 digitos.',
      });
      return false;
    }

    return true;
  }
  registrar(usuario: Usuario){
    if(this.validateForm()){
    const encrypted = this.encriptacion.set(this.llave, usuario.contrasena)
    usuario.contrasena=encrypted
      this.servicioUsuario.register({ email: usuario.correo, password: usuario.contrasena,usuario: usuario }).then(()=>{
        this.servicioUsuario.logout()
        console.log("Usuario Registrado");
        this.router.navigate(['paginas/sesion']);
      }).catch(error=> console.log(error)); 
  }
}
}
