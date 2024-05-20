import { Injectable } from '@angular/core';
import { Resend } from 'resend';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  //para usar como servicio rest
  private url = 'https://api.resend.com';
  private apiKey = 're_fR5EFKtk_4AphesH8WyQp7v27XX5A4LTs';
  //usar la api resend
  private resend: Resend;
  constructor() {
    this.resend = new Resend(this.apiKey);
   }
   async enviarCorreo(from: string, to: string, subject: string, html: string): Promise<any> {
    try {
      const { data, error } = await this.resend.emails.send({
        from,
        to,
        subject,
        html
      });

      if (error) {
        console.error('Error enviando correo electrónico', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error en la solicitud de envío de correo', error);
      throw error;
    }
  }
   async enviarCorreoRest(from: string, to: string, subject: string, html: string): Promise<any> {
    try {
      const response = await axios.post(this.url, {
        from,
        to,
        subject,
        html
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error enviando correo electrónico', error);
      throw error;
    }
  }
}
