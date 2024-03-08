import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Documento } from 'src/app/domain/Documento';
import { DocumentoService } from 'src/app/service/documento.service';


@Component({
  selector: 'app-transparencia',
  templateUrl: './transparencia.component.html',
  styleUrls: ['./transparencia.component.scss']
})
export class TransparenciaComponent implements OnInit {
  listaDocumentos:Documento[]=[]
  listaDocumentosFire:any;
  displayedColumns: string[]=['Numero','Nombre','Año','Presupuesto','Ingresos','Egresos','Documento']
  dataSource=this.documentoService.getAll();
  @ViewChild(MatTable)
  table!: MatTable<Documento>;

  constructor(private router: Router, private app: AppComponent, private documentoService: DocumentoService){
    this.listaDocumentosFire= documentoService.getAll();
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
