import { Component, HostListener } from '@angular/core';
import 'bootstrap';
import * as AOS from 'aos';
import { UsuarioService } from './service/usuario.service';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Bomberos Oña';
  isCollapsed: boolean = false;
  isCollapsed2: boolean = false;
  botonColapso: boolean = false;
  currentUser: any;
  
  constructor(private auth: Auth, private usuarioService: UsuarioService,private routeA: ActivatedRoute,private router: Router){

  }
  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
  this.botonColapso = window.innerWidth <= 520;
  if(this.isCollapsed==true&&window.innerWidth>=521){
    this.isCollapsed = !this.isCollapsed;
  }
  }
ngOnInit(){
  this.auth.onAuthStateChanged(user => {
    if (user) {
      this.usuarioService.getUserData(user.uid);  // Obtener los datos del usuario
      this.verificar();  // Verificar el rol y actualizar la UI
      this.inicioS();  // Actualizar la interfaz de usuario para mostrar el estado de sesión
    }
  });
  setTimeout(() => {
    this.visualizar() // Realizar el cambio de forma asincrónica
  });
  this.onResize();
  AOS.init();
  window.addEventListener('load',AOS.refresh);
}
 btnAdmin=false;
 noticias=true;
 carrusel=true;
 bCerrar=false;
 bInicio=true;
 sacar=true;
 meter=false;

 visualizar() {
  const currentUrl = this.router.url;
  console.log(currentUrl)
  if (currentUrl === '/') {
    this.aparecer()
  }
}
 inicioS(){
  this.bCerrar=true;
  this.bInicio=false;
 }
 cerrarS(){
  this.bInicio=true;
  this.bCerrar=false;
  this.isCollapsed2=false;
  this.btnAdmin = false;
  localStorage.removeItem('btnAdmin');
 }
  ocultar(){
    this.carrusel=false;
    this.isCollapsed2=false;
  }
  aparecer(){
    this.carrusel=true;
  }
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.animacionboton()
  }
  toggleCollapse2() {
    this.isCollapsed2 = !this.isCollapsed2;
    this.meter=!this.meter;
    this.sacar=!this.sacar;
  }
animacionboton(){
  var elemento = document.getElementById('colapso')
  if(elemento?.classList.contains('animacion4')){
  setTimeout(function () {
    elemento?.classList.add('animacion3');
    elemento?.classList.remove('animacion4')
  });
}else if(elemento?.classList.contains('animacion3'))
setTimeout(function () {
  elemento?.classList.add('animacion4');
  elemento?.classList.remove('animacion3')
});
  
}
cerrar(){
  this.usuarioService.logout()
  this.cerrarS()
  console.log("sesion cerrada")
}
verificar(){
  this.auth.onAuthStateChanged(user => {
    if(user){
      this.inicioS();
      if (localStorage.getItem('btnAdmin') === 'true') {
        this.btnAdmin = true;  // Mostrar el botón de administrador si está guardado en localStorage
      }
    }
  });
}


}
