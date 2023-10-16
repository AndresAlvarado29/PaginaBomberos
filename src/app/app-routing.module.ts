import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompraComponent } from './pages/compra/compra.component';
import { TransparenciaComponent } from './pages/transparencia/transparencia.component';
import { ServicioComponent } from './pages/servicio/servicio.component';

const routes: Routes = [
  {path:"paginas/compras", component:CompraComponent},
  {path:"paginas/transparencia",component:TransparenciaComponent},
  {path:"paginas/servicio",component:ServicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
