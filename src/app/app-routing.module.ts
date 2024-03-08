import { NgModule } from '@angular/core';

import { TransparenciaComponent } from './pages/transparencia/transparencia.component';
import { ServicioComponent } from './pages/servicio/servicio.component';
import { RouterModule, Routes } from '@angular/router';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { DocumentoComponent } from './pages/documento/documento.component';


const routes: Routes = [
  {path:"paginas/contacto", component:ContactoComponent},
  {path:"paginas/transparencia",component:TransparenciaComponent},
  {path:"paginas/servicio",component:ServicioComponent},
  {path:"paginas/noticias",component:NoticiasComponent},
  {path:"paginas/documentos",component:DocumentoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
