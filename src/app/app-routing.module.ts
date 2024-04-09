import { NgModule } from '@angular/core';

import { TransparenciaComponent } from './pages/transparencia/transparencia.component';
import { ServicioComponent } from './pages/servicio/servicio.component';
import { RouterModule, Routes } from '@angular/router';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { DocumentoComponent } from './pages/documento/documento.component';
import { SesionComponent } from './pages/sesion/sesion.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path:"paginas/contacto", component:ContactoComponent},
  {path:"paginas/transparencia",component:TransparenciaComponent},
  {path:"paginas/servicio",component:ServicioComponent},
  {path:"paginas/menu/noticias",component:NoticiasComponent},
  {path:"paginas/menu/documentos",component:DocumentoComponent},
  {path:"paginas/sesion",component:SesionComponent},
  {path:"paginas/registro", component:RegistroComponent},
  {path:"paginas/menu", component:MenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
