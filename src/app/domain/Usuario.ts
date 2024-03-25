export class Usuario{
    nombre:string='';
    apellido:string='';
    correo:string='';
    contrasena:string='';
    celular: string='';
    direccion: string='';
    rol: string='';
    toJSON() {
        return {
          nombre: this.nombre,
          apellido: this.apellido,
          correo: this.correo,
          contrasena: this.contrasena,
          celular: this.celular,
          direccion: this.direccion,
          rol: this.rol
        };
      }
    }
