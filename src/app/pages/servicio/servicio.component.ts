import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { ArchivoClienteService } from 'src/app/service/fileService/archivo-cliente.service';
import { environment } from 'src/envs/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss']
})
export class ServicioComponent {
  private llaveMail= environment.keyMailService;
  private llaveTemplate= environment.keyTemplateService;
  private llavePublica= environment.PublicKey;
  permisoForm=false
  documentosCargados: File[] = [];
  selectedCapacitaciones: string[] = [];
  capacitacionForm=false
  isCollapsed1: boolean = true;
  isCollapsed2: boolean = true;
  isCollapsed3: boolean = true;
  quemaForm=false
  formulario=false
  isUploading = false;
  uploadProgress = 0;
  constructor(private router: Router, private app: AppComponent, private archivoClienteService: ArchivoClienteService){
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
onFilesSelected(event: any) {
  this.documentosCargados = Array.from(event.target.files);
  if(this.documentosCargados.length>5){
    Swal.fire({
      icon: 'error',
      title: 'Demasiados archivos',
      text: 'Solo puedes subir hasta 5 archivos.',
    });
    return;
  }
}
validateForm(form: any): boolean {
  const nombreApellidoPattern = /^[a-zA-Z\s]+$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phonePattern = /^\d{10}$/;

  if (!form.value.nombre || form.value.nombre.trim() === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Datos Faltantes',
      text: 'El campo nombre es obligatorio.',
    });
    return false;
  } else if (!nombreApellidoPattern.test(form.value.nombre)) {
    Swal.fire({
      icon: 'warning',
      title: 'Formulario Invalido',
      text: 'No ingrese números o signos especiales en el nombre.',
    });
    return false;
  }

  if (!form.value.apellido || form.value.apellido.trim() === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Datos Faltantes',
      text: 'El campo apellido es obligatorio.',
    });
    return false;
  } else if (!nombreApellidoPattern.test(form.value.apellido)) {
    Swal.fire({
      icon: 'warning',
      title: 'Formulario Invalido',
      text: 'No ingrese números o signos especiales en el apellido.',
    });
    return false;
  }

  if (!form.value.correo || !emailPattern.test(form.value.correo)) {
    Swal.fire({
      icon: 'warning',
      title: 'Formulario Invalido',
      text: 'Por favor, ingrese un correo electrónico válido.',
    });
    return false;
  }

  if (!form.value.celular || !phonePattern.test(form.value.celular)) {
    Swal.fire({
      icon: 'warning',
      title: 'Formulario Invalido',
      text: 'Por favor, ingrese un número de celular válido (10 dígitos).',
    });
    return false;
  }

  if (!form.value.descripcion || form.value.descripcion.trim() === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Formulario Invalido',
      text: 'El campo descripción es obligatorio.',
    });
    return false;
  }

  return true;
}

onSubmit(form: any, event: MouseEvent) {
  if (!this.validateForm(form)) return;

  if (this.documentosCargados.length > 0 && this.documentosCargados.some(file => file.size > 10 * 1024 * 1024)) {
    Swal.fire({
      icon: 'error',
      title: 'Archivo demasiado grande',
      text: 'Uno o más archivos superan el tamaño máximo permitido de 10MB.',
    });
    return;
  }

  this.isUploading = true;
  this.uploadProgress = 0;

  if (this.documentosCargados.length > 0) {
    this.archivoClienteService.subirArchivos(this.documentosCargados, (progress) => {
      this.uploadProgress = progress;
    }).then(urls => {
      this.sendEmail(form, urls);
      this.isUploading = false;
      setTimeout(() => {
        this.desactivarFormulario(event);
      }, 3000);
    }).catch(error => {
      console.error('Error al subir los archivos:', error);
      this.isUploading = false;
    });
  } else {
    this.sendEmail(form);
    this.isUploading = false;
  }
}

sendEmail(form: any, fileUrl?: string[]) {
  const templateParams = {
    nombre: form.value.nombre,
    apellido: form.value.apellido,
    correo: form.value.correo,
    celular: form.value.celular,
    descripcion: form.value.descripcion,
    file_url: fileUrl || []
  };

  emailjs.send(this.llaveMail || '', this.llaveTemplate || '', templateParams, this.llavePublica || '')
    .then((response: EmailJSResponseStatus) => {
      console.log('Success!', response.status, response.text);
      Swal.fire({
        title: "Se ha enviado Correctamente el Correo",
        text: "Haz click en el botón",
        icon: "success"
      });
    }, (error) => {
      console.error('Error!', error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Hubo un problema al enviar el correo",
      });
    });
}
//envio de datos del formulario de capacitaciones 
onSubmitCapacitaciones(form: any,event: MouseEvent) {
  if (!this.validateForm(form)) return;
  if (this.documentosCargados.length > 0 && this.documentosCargados.some(file => file.size > 10 * 1024 * 1024)) {
    Swal.fire({
      icon: 'error',
      title: 'Archivo demasiado grande',
      text: 'Uno o más archivos superan el tamaño máximo permitido de 10MB.',
    });
    return;
  }
  this.isUploading = true;
  this.uploadProgress = 0;
  console.log(this.selectedCapacitaciones);
  Object.keys(form.controls).forEach(controlName => {
    const control = form.controls[controlName];
    if (control.value === true && controlName.startsWith('capacitaciones')) {
      this.selectedCapacitaciones.push(controlName.replace('capacitaciones.', ''));
      console.log(this.selectedCapacitaciones);
    }
  });
  if (this.documentosCargados.length > 0) {
    this.archivoClienteService.subirArchivos(this.documentosCargados,(progress)=>{
      this.uploadProgress = progress;
    }).then(urls => {
      this.sendEmailCapacitaciones(form, this.selectedCapacitaciones, urls);
      this.isUploading = false;
      setTimeout(()=>{
        this.desactivarFormulario(event)
      },3000)
    }).catch(error => {
      console.error('Error al subir los archivos:', error);
      this.isUploading = false;
    });
  } else {
    this.sendEmailCapacitaciones(form, this.selectedCapacitaciones);
    this.isUploading = false;
  }
}
sendEmailCapacitaciones(form: any, selectedCapacitaciones: string[]=[], fileUrl: string[] = []){
  const templateParams = {
    nombre: form.value.nombre,
    apellido: form.value.apellido,
    correo: form.value.correo,
    celular: form.value.celular,
    descripcion: form.value.descripcion,
    capacitaciones: selectedCapacitaciones.length > 0 ? "Las capacitaciones que desea son: " + selectedCapacitaciones.join(', ') : "No se seleccionaron capacitaciones",
    file_url: fileUrl || []
  };
  console.log(fileUrl);
  console.log(selectedCapacitaciones);
  emailjs.send(this.llaveMail || '', this.llaveTemplate || '', templateParams, this.llavePublica || '')
    .then((response: EmailJSResponseStatus) => {
      console.log('Success!', response.status, response.text);
      Swal.fire({
        title: "Se a enviado Correctamente el Correo",
        text: "Haz click en el boton",
        icon: "success"
      }); 
    }, (error) => {
      console.error('Error!', error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Hubo un problema al enviar el correo",
      });
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
  desactivarFormulario(event?: MouseEvent){
    this.permisoForm=false
    this.quemaForm=false
    this.capacitacionForm=false
    this.formulario=false
    if(event){
      const botonClicado = event.currentTarget as HTMLButtonElement;
      const botonesSolicitud = document.querySelectorAll('button[id^="boton"]');
      botonesSolicitud.forEach((boton: Element) => {
        if (boton !== botonClicado) {
          (boton as HTMLButtonElement).disabled = false;
        }
      });
    }
  }
  /**
   * 
   * @param event 
   * toma un evento del mouse para deshabilitar los otros botones de solicitar una solicitud
   * crea una const con el evento del mouse para tener acceso a los elementos del boton para
   * deshabilitarlo y una const para obtener todos los elemntos con id = boton y ver que bo
   * ton no fue clickeado
   */
  habilitarBotones(event?: MouseEvent) {
    if(event){
    const botonClicado = event.currentTarget as HTMLButtonElement;
    const botonesSolicitud = document.querySelectorAll('button[id^="boton"]');
    
    botonesSolicitud.forEach((boton: Element) => {
      if (boton !== botonClicado) {
        (boton as HTMLButtonElement).disabled = true;
      }
    });
  }
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

limpiarInputArchivo() {
  const inputElement = document.getElementById('inputArchivo') as HTMLInputElement;
  if (inputElement) {
    inputElement.value = ''; // Restablece el valor del campo de entrada de archivo a una cadena vacía
  }
}
}
