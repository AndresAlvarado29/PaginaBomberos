import { Component, HostListener } from '@angular/core';
import 'bootstrap';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import * as AOS from 'aos';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bomberos Oña';
  
  constructor(private scrollDispatcher: ScrollDispatcher){

  }
ngOnInit(){
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
}
