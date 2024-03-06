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
  isCollapsed1: boolean = true;
  isCollapsed2: boolean = true;
  isCollapsed3: boolean = true;
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
  toggleCollapse() {
    this.isCollapsed1 = !this.isCollapsed1;
    this.animacionboton()
  }
  toggleCollapse2() {
    this.isCollapsed2 = !this.isCollapsed2;
    this.animacionboton2()
  }
  toggleCollapse3() {
    this.isCollapsed3 = !this.isCollapsed3;
    this.animacionboton3()
  }
  animacionboton(){
    var elemento = document.getElementById('colapso1')
    setTimeout(function () {
      elemento?.classList.add('animacion2');
    });
  if(elemento?.classList.contains('animacion2'))
  setTimeout(function () {
    elemento?.classList.remove('animacion2')
  });
}
animacionboton2(){
  var elemento = document.getElementById('colapso2')
  setTimeout(function () {
    elemento?.classList.add('animacion2');
  });
if(elemento?.classList.contains('animacion2'))
setTimeout(function () {
  elemento?.classList.remove('animacion2')
});
}
animacionboton3(){
  var elemento = document.getElementById('colapso3')
  setTimeout(function () {
    elemento?.classList.add('animacion2');
  });
if(elemento?.classList.contains('animacion2'))
setTimeout(function () {
  elemento?.classList.remove('animacion2')
});
}
mostrarInfoInputs() {
  const files = document.querySelectorAll<HTMLInputElement>('.estilo1'); 
  Array.from(files).forEach(f => {
    f.addEventListener('change', e => {
      const span = document.querySelector('.estilo1-name > span');
      if (f.files && f.files.length > 0) { // Verifica si f.files existe y tiene elementos
      if(f.files.length == 0){
        if(span){
          span.innerHTML ='Ningun Archivos selecionado';
        }
      }else if(f.files.length > 1){
        if(span){
        span.innerHTML = f.files.length + 'Archivos selecionados';
      }
      }else if (span) {
        span.innerHTML = f.files && f.files.length > 0 ? f.files[0].name : '';
    }
      }
    });
  });
}
}
