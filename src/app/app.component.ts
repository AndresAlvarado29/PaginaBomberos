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
  setTimeout(() => {
    this.visualizar() // Realizar el cambio de forma asincrónica
  });
  this.verificar();
  this.onResize();
  AOS.init();
  window.addEventListener('load',AOS.refresh);
  this.routeA.queryParams.subscribe(params =>{
    const role = params['role'];
    console.log('Rol del usuario:', role);
    if(role==='role'){
      this.btnF=true;
    }
  })
}
 btnF=false;
 noticias=true;
 carrusel=true;
 bCerrar=false;
 bInicio=true;

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
 }
  ocultar(){
    this.carrusel=false;
  }
  aparecer(){
    this.carrusel=true;
  }
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.animacionboton()
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
  this.auth.onAuthStateChanged(user=>{
    if(user){
      this.inicioS()
    }
  });
}

}
