import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicioComponent } from './pages/servicio/servicio.component';
import { TransparenciaComponent } from './pages/transparencia/transparencia.component';

import { NoticiasComponent } from './pages/noticias/noticias.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { HttpClientModule } from '@angular/common/http';
//firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore'
//materials
import { MatTableModule} from '@angular/material/table';
import { DocumentoComponent } from './pages/documento/documento.component';
import { SesionComponent } from './pages/sesion/sesion.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { RegistroComponent } from './pages/registro/registro.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [
    AppComponent,
    ServicioComponent,
    TransparenciaComponent,
    NoticiasComponent,
    ContactoComponent,
    DocumentoComponent,
    SesionComponent,
    RegistroComponent,
    MenuComponent,
    
      
  ],
  imports: [
    MatTableModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    HttpClientModule,
    AngularFireModule,
    provideFirebaseApp(() => initializeApp({"projectId":"bomberosproject","appId":"1:793810426032:web:64869b8f04cf2aa3080375","storageBucket":"bomberosproject.appspot.com","apiKey":"AIzaSyDO4QpybFPmAX_UhY351VKfZoE1MbBqC_k","authDomain":"bomberosproject.firebaseapp.com","messagingSenderId":"793810426032"})),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
