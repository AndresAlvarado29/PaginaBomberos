import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicioComponent } from './pages/servicio/servicio.component';
import { CompraComponent } from './pages/compra/compra.component';
import { TransparenciaComponent } from './pages/transparencia/transparencia.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ServicioComponent,
    CompraComponent,
    TransparenciaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
