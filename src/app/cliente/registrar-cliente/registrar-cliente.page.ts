import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ClienteService } from '../../servicio/cliente.service';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.page.html',
  styleUrls: ['./registrar-cliente.page.scss'],
  standalone: false,
})
export class RegistrarClientePage {
  
  cliente = {
    nombre: '',
    telefono: '',
    dni: '',
    ruc: '',
    direccion: '',
    correo: ''
  };

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async registrarCliente() {
    if (!this.cliente.nombre.trim() || !this.cliente.telefono.trim()) {
      await this.mostrarAlert('Error', 'Nombre y teléfono son obligatorios');
      return;
    }

    // Validar DNI si fue ingresado
    if (this.cliente.dni && this.cliente.dni.length !== 8) {
      await this.mostrarAlert('Error', 'El DNI debe tener 8 dígitos');
      return;
    }

    // Validar RUC si fue ingresado
    if (this.cliente.ruc && this.cliente.ruc.length !== 11) {
      await this.mostrarAlert('Error', 'El RUC debe tener 11 dígitos');
      return;
    }

    // Validar correo si fue ingresado
    if (this.cliente.correo && !this.validarEmail(this.cliente.correo)) {
      await this.mostrarAlert('Error', 'El correo electrónico no es válido');
      return;
    }

    try {
      this.clienteService.agregarCliente(this.cliente);
      await this.mostrarToast('Cliente registrado correctamente');
      this.limpiarFormulario();
      this.router.navigate(['/listar-cliente']);
    } catch (error) {
      await this.mostrarAlert('Error', 'No se pudo registrar el cliente');
    }
  }

  validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  limpiarFormulario() {
    this.cliente = {
      nombre: '',
      telefono: '',
      dni: '',
      ruc: '',
      direccion: '',
      correo: ''
    };
  }

  async mostrarAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
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