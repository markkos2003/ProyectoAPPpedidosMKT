import { Injectable } from '@angular/core';
import { AlertController, ToastController,ActionSheetController,
  ModalController,ActionSheetButton } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class Alertas {


constructor(
 private dialogos:AlertController,
 private mensajes:ToastController,
 private menus:ActionSheetController,
 private cargas:LoadingController,
 private modal:ModalController){}

async mostrarDialogo(mensaje: string, titulo: string = 'Información'): Promise<void> {
  const alert = await this.dialogos.create({
    header: titulo,
    message: mensaje,
    buttons: ['OK']
  });
  await alert.present();
}

async mostrarMensaje(
  mensaje: string, 
  duracion: number = 3000, 
  color: string = 'success', 
  posicion: 'top' | 'bottom' | 'middle' = 'bottom'
): Promise<void> {
  const toast = await this.mensajes.create({
    message: mensaje,
    duration: duracion,
    position: posicion,
    color: color
  });
  await toast.present();
}

// devuelven una promesa


async dialogoConfirmacion(mensaje: string, titulo: string = 'Confirmar'): Promise<boolean> {
  return new Promise(async (resolve) => {
    const alert = await this.dialogos.create({
      header: titulo,
      message: mensaje,
      buttons: [
        { text: 'Cancelar', role: 'cancel', handler: () => resolve(false) },
        { text: 'Aceptar', handler: () => resolve(true) },
      ],
    });
    await alert.present();
  });
}

//opcional
async mostrarConfirmacion(titulo: string, mensaje: string): Promise<boolean> {
  return new Promise(async (resolve) => {
    const alert = await this.dialogos.create({
      header: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => resolve(false)
        },
        {
          text: 'Continuar',
          handler: () => resolve(true)
        }
      ]
    });
    await alert.present();
  });
}

 async dialogoPrompt(mensaje: string, titulo: string = 'Ingresar Valor', placeholder: string = ''): Promise<string | null> {
  return new Promise(async (resolve) => {
    const alert = await this.dialogos.create({
      header: titulo,
      message: mensaje,
      inputs: [{ name: 'inputField', type: 'text', placeholder: placeholder }],
      buttons: [
        { text: 'Cancelar', role: 'cancel', handler: () => resolve(null) },
        { text: 'Aceptar', handler: (data) => resolve(data.inputField) },
      ],
    });
    await alert.present();
  });
}


async menuOpciones(opciones: string[], titulo: string = 'Seleccionar Acción'): Promise<string | null> {
  return new Promise(async (resolve) => {
    // 1. Tipamos explícitamente como ActionSheetButton[]
    const buttons: ActionSheetButton[] = opciones.map(op => ({
      text: op,
      handler: () => {
        // Debes retornar true o el valor en el handler para que ActionSheet lo maneje
        resolve(op);
        return true; 
      }
    }));

    // 2. Aquí es donde VS Code podría marcar en rojo si no se reconoce el 'role'
    buttons.push({ 
        text: 'Cancelar', 
        role: 'cancel', // <- Con el tipado correcto, esto debería dejar de marcarse en rojo
        handler: () => {
            resolve(null);
            return true; // Necesario en handlers de ActionSheet
        }
    });

    const actionSheet = await this.menus.create({
      header: titulo,
      buttons: buttons,
    });
    await actionSheet.present();
  });
}



//mostrar cargas
private loadingElement?: HTMLIonLoadingElement;

async mostrarCarga(mensaje: string = 'Cargando...'): Promise<void> {
  // Asegurarse de que no haya otra carga activa
  if (this.loadingElement) {
    await this.loadingElement.dismiss();
  }
  
  this.loadingElement = await this.cargas.create({
    message: mensaje,
    spinner: 'crescent' // o 'dots', 'lines', etc.
  });
  await this.loadingElement.present();
}


async ocultarCarga(): Promise<void> {
  console.log('se llego a ocultar la carga');
  if (this.loadingElement) {
    await this.loadingElement.dismiss();
    this.loadingElement = undefined;
  }
}





}









  

