import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
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
  displayedColumns: string[] = ['Numero', 'Nombre', 'Año', 'Presupuesto', 'Ingresos', 'Egresos', 'Documento'];
  dataSource: MatTableDataSource<Documento>;
  filtroBusqueda: string = '';
  @ViewChild(MatTableDataSource)table!: MatTableDataSource<Documento>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private app: AppComponent, private documentoService: DocumentoService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.documentoService.getAll().subscribe(data => {
      data.sort((a, b) => a.anio - b.anio);
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
    });

    setTimeout(() => {
      this.visualizar(); // Realizar el cambio de forma asincrónica
    });
  }

  visualizar() {
    const currentUrl = this.router.url;
    if (currentUrl == '/paginas/transparencia') {
      this.app.ocultar();
    }
  }
  aplicarFiltroBusqueda() {
    this.dataSource.filter = this.filtroBusqueda.trim().toLowerCase();
  }
}
