import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss']
})
export class ServicioComponent {
  permisoForm=false
  capacitacionForm=false
  quemaForm=false
  formulario=false
  constructor(private router: Router, private app: AppComponent){
  }
  
  deshabilitarOtros(botonClickeado: HTMLElement) {
    const botones = document.getElementById
    
    console.log(botones+""+botonClickeado)
  }
  ngOnInit(){
  setTimeout(() => {
    this.visualizar() // Realizar el cambio de forma asincrónica
  });
}
  visualizar() {
    const currentUrl = this.router.url;
    if (currentUrl == '/paginas/servicio') {
      this.app.ocultar()
    }
  }
  activarFormularioPermiso(event: MouseEvent){
    this.permisoForm=true
    this.formulario=true
    this.habilitarBotones(event)
  }
  activarFormularioQuema(event: MouseEvent){
  this.quemaForm=true
  this.formulario=true
  this.habilitarBotones(event)
  }
  activarFormularioCapacitaciones(event: MouseEvent){
    this.capacitacionForm=true
  this.formulario=true
  this.habilitarBotones(event)
  }
  desactivarFormulario(event: MouseEvent){
    this.permisoForm=false
    this.quemaForm=false
    this.capacitacionForm=false
    this.formulario=false
    const botonClicado = event.currentTarget as HTMLButtonElement;
    const botonesSolicitud = document.querySelectorAll('button[id^="boton"]')
    botonesSolicitud.forEach((boton:Element)=>{
      if (boton !== botonClicado ){
        (boton as HTMLButtonElement).disabled = false;
      }
    })
  }
  /**
   * 
   * @param event 
   * toma un evento del mouse para deshabilitar los otros botones de solicitar una solicitud
   * crea una const con el evento del mouse para tener acceso a los elementos del boton para
   * deshabilitarlo y una const para obtener todos los elemntos con id = boton y ver que bo
   * ton no fue clickeado
   */
  habilitarBotones(event: MouseEvent) {
    const botonClicado = event.currentTarget as HTMLButtonElement;
    const botonesSolicitud = document.querySelectorAll('button[id^="boton"]');
    
    botonesSolicitud.forEach((boton: Element) => {
      if (boton !== botonClicado) {
        (boton as HTMLButtonElement).disabled = true;
      }
    });
  }
  

}
