import { Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { AppComponent } from 'src/app/app.component';
import { Documento } from 'src/app/domain/Documento';
import { DocumentoService } from 'src/app/service/documento.service';


@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.scss']
})
export class DocumentoComponent {
  listaDocumentosFire:any;
  documentoCargado:File | null = null;
  selectedDocumento: Documento | null = null;
  displayedColumns: string[]=['Numero','Nombre','Año','Presupuesto','Ingresos','Egresos','Documento','Accion']
  dataSource= new MatTableDataSource<Documento>();
  @ViewChild(MatTableDataSource)table!: MatTableDataSource<Documento>;
  @ViewChild(MatSort) sort!: MatSort;
  documento: Documento = new Documento();
  filtroBusqueda: string = '';

 constructor(private documentoService: DocumentoService, private router:Router, private app: AppComponent){
  this.listaDocumentosFire= documentoService.getAll();
  let params = this.router.getCurrentNavigation()?.extras.queryParams;
  if(params) {
    this.documento = new Documento()
    this.documento = params['documento']
  }
  this.listaDocumentosFire.subscribe((documentos: Documento[]) => {
    // Asignar los datos al MatTableDataSource
    this.dataSource.data = documentos;
  });
 }
 
 async guardar(documento: Documento) {
  try {
    if (!documento.uid) {
      if(this.documentoCargado){
        const response =await this.documentoService.subirArchivo(this.documentoCargado,documento)
        console.log("Documento creado:", response);
        this.documento = new Documento();
        this.limpiarInputArchivo();
        }else{
          console.log('falla al obtener el documento')
        }
    } else {
      if(this.documentoCargado){
      const actualizacion = await this.documentoService.subirArchivo(this.documentoCargado, documento);
      console.log("Documento actualizado:", actualizacion);
      this.documento = new Documento();
      this.limpiarInputArchivo();
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
    console.log(documento);
    this.limpiarInputArchivo();
}
ngOnInit(){
  this.documentoService.getAll().subscribe(data => {
    data.sort((a, b) => a.anio - b.anio);
    this.dataSource.data = data;
    this.dataSource.sort = this.sort;
  });
  setTimeout(() => {
    this.visualizar() // Realizar el cambio de forma asincrónica
  });
}
  visualizar() {
    const currentUrl = this.router.url;
    if (currentUrl == '/paginas/menu/documentos') {
      this.app.ocultar()
    }
  }
  aplicarFiltroBusqueda() {
    this.dataSource.filter = this.filtroBusqueda.trim().toLowerCase();
  }
  limpiarInputArchivo() {
    const inputElement = document.getElementById('inputArchivo') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = ''; // Restablece el valor del campo de entrada de archivo a una cadena vacía
    }
  }
}
