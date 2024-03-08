import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
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
 const response = await this.documentoService.save(documento)
 console.log(response) 
 this.documento = new Documento()
  console.log("creado");
}
async borrar(documento: Documento){
    let params: NavigationExtras = {
      queryParams: {
        documento: documento,
      }
    }
 await this.documentoService.delete(documento.uid);
}
async actualizar(documento: Documento){
  const response = await this.documentoService.update(documento.uid,documento);
}
ngOnInit(){
  setTimeout(() => {
    this.visualizar() // Realizar el cambio de forma asincrónica
  });
}
  visualizar() {
    const currentUrl = this.router.url;
    if (currentUrl == '/paginas/transparencia') {
      this.app.ocultar()
    }
  }
}
