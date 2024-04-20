import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncriptacionService {

 //metodo de encryptar
  set(keys:any, value:any){
    const key = CryptoJS.enc.Utf8.parse(keys);
    const iv = CryptoJS.enc.Utf8.parse(keys);
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()),key,
      {
        keySize: 128/ 8,
        iv:iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
        return encrypted.toString();
  }

  //metodo de desencryptar
  get(keys:any, value:any){
    const key = CryptoJS.enc.Utf8.parse(keys);
    const iv = CryptoJS.enc.Utf8.parse(keys);
    const decrypted = CryptoJS.AES.decrypt(value,key,
      {
        keySize: 128/ 8,
        iv:iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7       
      });
        return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
