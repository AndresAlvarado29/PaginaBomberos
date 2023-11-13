import { NgModule } from '@angular/core';
import { CompraComponent } from './pages/compra/compra.component';
import { TransparenciaComponent } from './pages/transparencia/transparencia.component';
import { ServicioComponent } from './pages/servicio/servicio.component';
import { RouterModule, Routes } from '@angular/router';
import { NoticiasComponent } from './pages/noticias/noticias.component';

const routes: Routes = [
  {path:"paginas/compras", component:CompraComponent},
  {path:"paginas/transparencia",component:TransparenciaComponent},
  {path:"paginas/servicio",component:ServicioComponent},
  {path:"paginas/noticias",component:NoticiasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
