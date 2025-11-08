import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { PedidoService, Pedido, EstadoPedido } from '../servicio/pedido.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./visualizar.page.scss'],
  standalone: false,
})
export class VisualizarPage implements OnInit {

  pedidos: Pedido[] = [];
  pedidosFiltrados: Pedido[] = [];
  terminoBusqueda: string = '';
  filtroEstado: string = 'todos';

  constructor(
    private pedidoService: PedidoService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.cargarPedidos();
  }

  ionViewWillEnter() {
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.pedidoService.getPedidos().subscribe(pedidos => {
      this.pedidos = pedidos.sort((a, b) => 
        new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );
      this.aplicarFiltros();
    });
  }

  buscarPedidos() {
    this.aplicarFiltros();
  }

  filtrarPorEstado(estado: string) {
    this.filtroEstado = estado;
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    let resultado = [...this.pedidos];

    // Filtrar por estado
    if (this.filtroEstado !== 'todos') {
      resultado = resultado.filter(p => p.estado === this.filtroEstado);
    }

    // Filtrar por búsqueda
    if (this.terminoBusqueda.trim()) {
      const termino = this.terminoBusqueda.toLowerCase();
      resultado = resultado.filter(pedido => {
        const nombreCliente = pedido.clienteNombre.toLowerCase().includes(termino);
        const nombreProducto = pedido.items.some(item => 
          item.productoNombre.toLowerCase().includes(termino)
        );
        return nombreCliente || nombreProducto;
      });
    }

    this.pedidosFiltrados = resultado;
  }

  getColorEstado(estado: EstadoPedido): string {
    switch (estado) {
      case 'proceso':
        return 'warning';
      case 'cancelado':
        return 'danger';
      case 'recibido':
        return 'success';
      default:
        return 'medium';
    }
  }

  async cambiarEstado(pedido: Pedido) {
    const alert = await this.alertController.create({
      header: 'Cambiar Estado',
      message: `Estado actual: ${pedido.estado.toUpperCase()}`,
      inputs: [
        {
          type: 'radio',
          label: 'En Proceso',
          value: 'proceso',
          checked: pedido.estado === 'proceso'
        },
        {
          type: 'radio',
          label: 'Cancelado',
          value: 'cancelado',
          checked: pedido.estado === 'cancelado'
        },
        {
          type: 'radio',
          label: 'Recibido',
          value: 'recibido',
          checked: pedido.estado === 'recibido'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Cambiar',
          handler: (nuevoEstado: EstadoPedido) => {
            if (nuevoEstado && nuevoEstado !== pedido.estado) {
              this.pedidoService.actualizarEstadoPedido(pedido.id, nuevoEstado);
              this.mostrarToast(`Estado cambiado a ${nuevoEstado.toUpperCase()}`);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async eliminarPedido(pedido: Pedido) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: `¿Eliminar pedido de ${pedido.clienteNombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.pedidoService.eliminarPedido(pedido.id);
            this.mostrarToast('Pedido eliminado');
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