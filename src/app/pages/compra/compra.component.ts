import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class CompraComponent {
  constructor(private router: Router, private app: AppComponent){

  }
  ngOnInit(){
  setTimeout(() => {
    this.visualizar() // Realizar el cambio de forma asincrónica
  });
}
  visualizar() {
    const currentUrl = this.router.url;
    if (currentUrl == '/paginas/compras') {
      this.app.ocultar()
    }
  }
}
