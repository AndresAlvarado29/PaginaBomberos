import { Component, ViewChild} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Documento } from 'src/app/domain/Documento';
import { DocumentoService } from 'src/app/service/documento.service';


@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.scss']
})
export class DocumentoComponent {
  listaDocumentos:Documento[]=[]
  listaDocumentosFire:any;
  documentoCargado:File | null = null;
  selectedDocumento: Documento | null = null;
  displayedColumns: string[]=['Numero','Nombre','Año','Presupuesto','Ingresos','Egresos','Documento','Accion']
  dataSource=this.documentoService.getAll();
  @ViewChild(MatTable)
  table!: MatTable<Documento>;
 documento: Documento = new Documento();

 constructor(private documentoService: DocumentoService, private router:Router, private app: AppComponent){
  this.listaDocumentosFire= documentoService.getAll();
  let params = this.router.getCurrentNavigation()?.extras.queryParams;
  if(params) {
    this.documento = new Documento()
    this.documento = params['documento']
  }
 }

 async guardar(documento: Documento) {
  try {
    if (!documento.uid) {
      if(this.documentoCargado){
        const response =await this.documentoService.subirArchivo(this.documentoCargado,documento)
        console.log("Documento creado:", response);
        }else{
          console.log('falla al obtener el documento')
        }
      this.documento = new Documento();
    } else {
      if(this.documentoCargado){
      const actualizacion = await this.documentoService.subirArchivo(this.documentoCargado, documento);
      console.log("Documento actualizado:", actualizacion);
      this.documento = new Documento();
    }
    }
  } catch (error) {
    console.error("Error al guardar o actualizar el documento:", error);
  }
}
archivoSeleccionado(evento:Event):void{
  const inputElement = evento.target as HTMLInputElement;
  const archivo: File | null = (inputElement.files && inputElement.files.length > 0) ? inputElement.files[0] : null;
  console.log(archivo)
  if (archivo) {
    this.documentoCargado=archivo
  } else {
    console.error('No se seleccionó ningún archivo.');
  }
}


async borrar(documento: Documento){
alert('Esta seguro que desea eliminarlo')
 await this.documentoService.delete(documento.uid);
}
actualizar(documento: Documento) {
  this.selectedDocumento = documento;
    /*
    Object.assign hace una copia del documento para tabajar con una
    entidad independiente para no afectar a la tabla original sin
    pasar antes de la funcion guardarWS 
    */
    this.documento = Object.assign({}, documento);
    console.log(documento)
}
ngOnInit(){
  setTimeout(() => {
    this.visualizar() // Realizar el cambio de forma asincrónica
  });
}
  visualizar() {
    const currentUrl = this.router.url;
    if (currentUrl == '/paginas/documentos') {
      this.app.ocultar()
    }
  }
  filtro(event: Event){
    const valorFiltro = (event.target as HTMLInputElement).value;
    
  }
}
