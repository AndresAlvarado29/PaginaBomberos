import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { keysSecret } from 'src/llave/keySecretApiMail';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent {
  private llaveMail= keysSecret.keyMailService;
  private llaveTemplate= keysSecret.keyTemplateService;
  private llavePublica= keysSecret.PublicKey;
  constructor(private router: Router, private app: AppComponent){

  }
  ngOnInit(){
  setTimeout(() => {
    this.visualizar() // Realizar el cambio de forma asincrónica
  });
}
sendEmail(form:any){
  const templateParams = {
    nombre: form.value.nombre,
    apellido: form.value.apellido,
    correo: form.value.correo,
    celular: form.value.celular,
    direccion: form.value.direccion,
    descripcion: form.value.descripcion,
  };
 
  emailjs.send(this.llaveMail, this.llaveTemplate, templateParams, this.llavePublica)
    .then((response: EmailJSResponseStatus) => {
      console.log('Success!', response.status, response.text);
    }, (error) => {
      console.error('Error!', error);
    });
}
  visualizar() {
    const currentUrl = this.router.url;
    if (currentUrl == '/paginas/contacto') {
      this.app.ocultar()
    }
  }
}
