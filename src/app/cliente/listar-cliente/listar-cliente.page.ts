import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ClienteService, Cliente } from '../../servicio/cliente.service';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.page.html',
  styleUrls: ['./listar-cliente.page.scss'],
  standalone: false,
})
export class ListarClientePage implements OnInit {

  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.cargarClientes();
  }

  ionViewWillEnter() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  registrarCliente() {
    this.router.navigate(['/registrar-cliente']);
  }

  async editarCliente(cliente: Cliente) {
    const alert = await this.alertController.create({
      header: 'Editar Cliente',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre',
          value: cliente.nombre
        },
        {
          name: 'telefono',
          type: 'tel',
          placeholder: 'Teléfono',
          value: cliente.telefono
        },
        {
          name: 'dni',
          type: 'text',
          placeholder: 'DNI',
          value: cliente.dni || ''
        },
        {
          name: 'ruc',
          type: 'text',
          placeholder: 'RUC',
          value: cliente.ruc || ''
        },
        {
          name: 'direccion',
          type: 'text',
          placeholder: 'Dirección',
          value: cliente.direccion || ''
        },
        {
          name: 'correo',
          type: 'email',
          placeholder: 'Correo',
          value: cliente.correo || ''
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.nombre.trim() && data.telefono.trim()) {
              this.clienteService.actualizarCliente(cliente.id, {
                nombre: data.nombre,
                telefono: data.telefono,
                dni: data.dni,
                ruc: data.ruc,
                direccion: data.direccion,
                correo: data.correo
              });
              this.mostrarToast('Cliente actualizado correctamente');
              return true;
            } else {
              this.mostrarToast('Nombre y teléfono son obligatorios');
              return false;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async eliminarCliente(cliente: Cliente) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: `¿Eliminar a ${cliente.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.clienteService.eliminarCliente(cliente.id);
            this.mostrarToast('Cliente eliminado');
          }
        }
      ]
    });

    await alert.present();
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color: 'dark'
    });
    await toast.present();
  }
}