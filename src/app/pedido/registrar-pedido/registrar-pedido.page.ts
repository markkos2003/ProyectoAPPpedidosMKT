import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ClienteService, Cliente } from '../../servicio/cliente.service';
import { ProductoService, Producto } from '../../servicio/producto.service';
import { PedidoService, ItemPedido } from '../../servicio/pedido.service';

@Component({
  selector: 'app-registrar-pedido',
  templateUrl: './registrar-pedido.page.html',
  styleUrls: ['./registrar-pedido.page.scss'],
  standalone: false,
})
export class RegistrarPedidoPage implements OnInit {

  clientes: Cliente[] = [];
  productos: Producto[] = [];
  productoSeleccionado: Producto | null = null;
  cantidad: number = 1;

  pedido = {
    clienteId: '',
    clienteNombre: '',
    items: [] as ItemPedido[],
    estado: 'proceso' as const,
    notas: ''
  };

  constructor(
    private clienteService: ClienteService,
    private productoService: ProductoService,
    private pedidoService: PedidoService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.clienteService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });

    this.productoService.getProductos().subscribe(productos => {
      this.productos = productos;
    });
  }

  onClienteChange() {
    const cliente = this.clientes.find(c => c.id === this.pedido.clienteId);
    if (cliente) {
      this.pedido.clienteNombre = cliente.nombre;
    }
  }

  agregarProducto() {
    if (!this.productoSeleccionado || this.cantidad <= 0) {
      this.mostrarToast('Seleccione un producto y cantidad válida');
      return;
    }

    // Verificar si el producto ya está en la lista
    const existente = this.pedido.items.find(
      item => item.productoId === this.productoSeleccionado!.id
    );

    if (existente) {
      existente.cantidad += this.cantidad;
      existente.subtotal = existente.cantidad * existente.precio;
    } else {
      const item: ItemPedido = {
        productoId: this.productoSeleccionado.id,
        productoNombre: this.productoSeleccionado.nombre,
        cantidad: this.cantidad,
        precio: this.productoSeleccionado.precio,
        subtotal: this.cantidad * this.productoSeleccionado.precio
      };
      this.pedido.items.push(item);
    }

    // Resetear selección
    this.productoSeleccionado = null;
    this.cantidad = 1;
    this.mostrarToast('Producto agregado');
  }

  eliminarItem(index: number) {
    this.pedido.items.splice(index, 1);
    this.mostrarToast('Producto eliminado');
  }

  calcularTotal(): number {
    return this.pedido.items.reduce((total, item) => total + item.subtotal, 0);
  }

  async registrarPedido() {
    if (!this.pedido.clienteId || this.pedido.items.length === 0) {
      await this.mostrarAlert('Error', 'Seleccione un cliente y agregue productos');
      return;
    }

    const pedidoCompleto = {
      ...this.pedido,
      total: this.calcularTotal()
    };

    try {
      this.pedidoService.agregarPedido(pedidoCompleto);
      await this.mostrarAlert('Éxito', 'Pedido registrado correctamente');
      this.limpiarFormulario();
      this.router.navigate(['/visualizar']);
    } catch (error) {
      await this.mostrarAlert('Error', 'No se pudo registrar el pedido');
    }
  }

  limpiarFormulario() {
    this.pedido = {
      clienteId: '',
      clienteNombre: '',
      items: [],
      estado: 'proceso',
      notas: ''
    };
    this.productoSeleccionado = null;
    this.cantidad = 1;
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
