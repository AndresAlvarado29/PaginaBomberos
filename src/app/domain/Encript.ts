import * as CryptoJS from 'crypto-js'

export const encrypt = (data: string): string => {
  return CryptoJS.AES.encrypt(data,'').toString();
}

export const decrypt = <T>(valueEncrypt: string): T | null =>{
  const valueDecrypt= CryptoJS.AES.decrypt(valueEncrypt,'').toString(CryptoJS.enc.Utf8);
  if (!valueDecrypt){
    return null;
  }
  return JSON.parse(valueDecrypt) as T;
}