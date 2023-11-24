import { Component } from '@angular/core';
import 'bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bomberos Oña';

  ngOnInit(){
    
  }
  carrusel=true;

  ocultar(){
    this.carrusel=false;
  }
  aparecer(){
    this.carrusel=true;
  }
}
