import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class Mostrar {
   
  constructor(private toastController: ToastController) {}

  /*mustramensaje(mensaje:string){

   alert(mensaje)

  }*/


   async mustramensaje(mensaje: string, duracion: number = 3000) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion,
      position: 'bottom'
    });
    toast.present();
  }
  
}
