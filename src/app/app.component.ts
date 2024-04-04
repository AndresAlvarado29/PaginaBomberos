import { Component, HostListener } from '@angular/core';
import 'bootstrap';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import * as AOS from 'aos';
import { UsuarioService } from './service/usuario.service';



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
  
  constructor(private scrollDispatcher: ScrollDispatcher, private usuarioService: UsuarioService){

  }
  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
  this.botonColapso = window.innerWidth <= 520;
  if(this.isCollapsed==true&&window.innerWidth>=521){
    this.isCollapsed = !this.isCollapsed;
  }
  }
ngOnInit(){
  this.onResize();
  AOS.init()
  window.addEventListener('load',AOS.refresh);
}
 noticias=true;
  carrusel=true;

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
  console.log("sesion cerrada")
}

}
