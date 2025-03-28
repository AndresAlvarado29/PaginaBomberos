import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from 'src/envs/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent {
  private llaveMail = environment.keyMailService;
  private llaveTemplate = environment.keyTemplateService;
  private llavePublica = environment.PublicKey;

  constructor(private router: Router, private app: AppComponent) {}

  ngOnInit() {
    setTimeout(() => {
      this.visualizar(); // Realizar el cambio de forma asincrónica
    });
  }

  sendEmail(form: any) {
    if (this.validateForm(form)) {
      const templateParams = {
        nombre: form.value.nombre,
        apellido: form.value.apellido,
        correo: form.value.correo,
        celular: form.value.celular,
        direccion: form.value.direccion,
        descripcion: form.value.descripcion,
      };

      emailjs.send(this.llaveMail || '', this.llaveTemplate || '', templateParams, this.llavePublica || '')
        .then((response: EmailJSResponseStatus) => {
          console.log('Success!', response.status, response.text);
        }, (error) => {
          console.error('Error!', error);
        });
    }
  }

  validateForm(form: any): boolean {
    const nombreApellidoPattern = /^[a-zA-Z\s]+$/;
    if (!form.value.nombre || form.value.nombre.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Datos Faltantes',
        text: 'El campo nombre es obligatorio',
      });
      return false;
    }else if(!nombreApellidoPattern.test(form.value.nombre)){
      Swal.fire({
        icon: 'warning',
        title: 'Formulario Invalido',
        text: 'No ingrese números o signos especiales',
      }); 
      return false;
    }

    if (!form.value.apellido || form.value.apellido.trim() === '') {Swal.fire({
      icon: 'warning',
      title: 'Datos Faltantes',
      text: 'El campo apellido es obligatorio',
    });
    return false;
  }else if(!nombreApellidoPattern.test(form.value.apellido)){
    Swal.fire({
      icon: 'warning',
      title: 'Formulario Invalido',
      text: 'No ingrese numeros o signos especiales',
    }); 
    return false;
  }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!form.value.correo || !emailPattern.test(form.value.correo)) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario Invalido',
        text: 'Por favor, ingrese un correo electrónico válido.',
      }); 
      return false;
    }

    const phonePattern = /^\d{10}$/; 
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

  visualizar() {
    const currentUrl = this.router.url;
    if (currentUrl === '/paginas/contacto') {
      this.app.ocultar();
    }
  }
}
