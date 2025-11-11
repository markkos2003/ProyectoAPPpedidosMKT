import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Mostrar } from './mostrar';
import { environment } from 'src/environments/environment';
import { Basedatos } from './servicio/basedatos';

// ------------------ Importaciones Modulares de Firebase ------------------
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
//  provider modular para que el servicio Basedatos pueda inyectar 'Auth'
import { provideAuth, getAuth } from '@angular/fire/auth'; 


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    //  ELIMINADO: AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
    //  Inicializa la app de Firebase
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    
    //  Provee los servicios modulares 
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()), //   Necesario para inyectar 'Auth' en Basedatos
    
    // Otros servicios
    Mostrar,
    Basedatos 
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}