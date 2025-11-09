import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Basedatos } from 'src/app/servicio/basedatos';
import { AlertController } from '@ionic/angular';
import { Mostrar } from 'src/app/mostrar';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.page.html',
  styleUrls: ['./listar-cliente.page.scss'],
  standalone: false,
})
export class ListarClientePage implements OnInit {


  //cliente:string[]=["juan","matias","federico"];
  listaclientes:any[]=[];

  constructor(private router:Router,private based:Basedatos,private alerta:AlertController,
    private muestra:Mostrar
  ) { }

  ngOnInit():void {
    this.cargarClientes();
  }


  IrregistrarCliente(){

  const activo = document.activeElement as HTMLElement | null;
  if (activo) activo.blur();

  this.router.navigate(['/registrar-cliente']);


  }


  editarCliente(id:string){
   const activo = document.activeElement as HTMLElement | null;
   if (activo) activo.blur();

  this.router.navigate(['/actualizar-cliente',id]);


  }


 // eliminarCliente(indice:number){}



  async cargarClientes() {
    const resultado = await this.based.obtenerClientes();

    if (resultado.success) {
      this.listaclientes = resultado.data;
      console.log('Datos cargados:', this.listaclientes);
    } else {
      console.error('No se pudieron cargar los clientes:', resultado.error);
      // Mostrar un mensaje de error al usuario
    }
  }


  /*async eliminarCliente(id: string) {
    const alert = await this.alerta.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este cliente?',
      // ... (botones de Cancelar y Eliminar) ...
      handler: async () => {
        const resultado = await this.based.eliminarCliente(id);

        if (resultado.success) {
          // Éxito: Eliminar y actualizar lista
          await this.cargarClientes(); 
          this.muestra.mustramensaje('Cliente eliminado correctamente.');

        } else if (resultado.codigo === 'HAS_ORDERS') {
          // 🛑 Manejo específico del bloqueo por pedidos
          this.mostrarRestriccionAlert(resultado.error); 

        } else {
          // Manejo de otros errores
          this.muestra.mustramensaje('Error al intentar eliminar el cliente.');
        }
      },
    });

    await alert.present();
}*/


async eliminarCliente(id: string) {
    const alert = await this.alerta.create({
        header: 'Confirmar Eliminación',
        message: '¿Estás seguro de que deseas eliminar este cliente?',
        buttons: [
            { text: 'Cancelar', role: 'cancel' },
            {
                text: 'Eliminar',
                handler: async () => {
                    try {
                        // 1. Intentar la eliminación. Si es exitosa, el flujo sigue aquí.
                        await this.based.eliminarCliente(id); 

                        // 2. Éxito: Actualizar lista y mostrar mensaje.
                        await this.cargarClientes(); 
                        this.muestra.mustramensaje('Cliente eliminado correctamente.');

                    } catch (error: any) {
                        // 3. Fallo: El flujo salta aquí si el servicio lanza un error.
                        
                        if (error.codigo === 'HAS_ORDERS') {
                            // 🔴 Manejo específico del bloqueo por pedidos
                            this.mostrarRestriccionAlert(error.message); 
                        } else {
                            // Manejo de otros errores (ej: fallo de conexión, permisos)
                            console.error('Error al intentar eliminar:', error);
                            this.muestra.mustramensaje('Error al intentar eliminar el cliente.');
                        }
                    }
                },
            },
        ],
    });

    await alert.present();
}


async actualizarCliente(){






}


async mostrarRestriccionAlert(mensaje: string) {
    const alert = await this.alerta.create({
        header: 'Eliminación Bloqueada',
        message: mensaje, // Muestra el mensaje: "El cliente tiene pedidos asociados."
        buttons: ['Entendido'],
    });
    await alert.present();
}







}
