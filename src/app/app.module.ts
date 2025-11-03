import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Mostrar } from './mostrar';


//------------------integracion con firebase
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { Basedatos } from './servicio/basedatos';


//---------- Firestore MODERNA
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(environment.firebaseConfig)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideFirestore(() => getFirestore()),Mostrar,Basedatos],
  bootstrap: [AppComponent],
})
export class AppModule {}
