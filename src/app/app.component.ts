import { Component } from '@angular/core';
import { Router } from '@angular/router';
import 'bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bomberos Oña';
  constructor(){

  }
  ngOnInit(){
    
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
