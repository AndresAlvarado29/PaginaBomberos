export class Documento{
    uid:string='';
    nombre:string='';
    anio:number=0;
    presupuesto:number=0;
    ingresos:number=0;
    egresos: number=0;
    archivo: string='';
    toJSON() {
        return {
          uid: this.uid,
          nombre: this.nombre,
          anio: this.anio,
          presupuesto: this.presupuesto,
          ingresos: this.ingresos,
          egresos: this.egresos,
          archivo: this.archivo
        };
      }
    }

     