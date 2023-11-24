import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-transparencia',
  templateUrl: './transparencia.component.html',
  styleUrls: ['./transparencia.component.scss']
})
export class TransparenciaComponent {
  constructor(private router: Router, private app: AppComponent){

  }
  ngOnInit(){
  setTimeout(() => {
    this.visualizar() // Realizar el cambio de forma asincrónica
  });
}
  visualizar() {
    const currentUrl = this.router.url;
    if (currentUrl == '/paginas/transparencia') {
      this.app.ocultar()
    }
  }
}
