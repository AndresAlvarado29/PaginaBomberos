import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.scss']
})
export class SesionComponent {
  constructor(private router: Router, private app: AppComponent){}
  
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
}
