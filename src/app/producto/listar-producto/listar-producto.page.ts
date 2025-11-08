import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ProductoService, Producto } from '../../servicio/producto.service';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.page.html',
  styleUrls: ['./listar-producto.page.scss'],
  standalone: false,
})
export class ListarProductoPage implements OnInit {

  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController   // <-- necesario para los toasts
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  // Se llama cada vez que entras a la vista
  ionViewWillEnter() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }

  registrarproducto() {
    const activo = document.activeElement as HTMLElement | null;
    if (activo) activo.blur();
    this.router.navigate(['/registrar-producto']);
  }

  async editarProducto(producto: Producto) {
    const alert = await this.alertController.create({
      header: 'Editar Producto',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre',
          value: producto.nombre,
        },
        {
          name: 'precio',
          type: 'number',
          placeholder: 'Precio',
          value: producto.precio.toString(),
        },
        {
          name: 'stock',
          type: 'number',
          placeholder: 'Stock',
          value: (producto.stock ?? 0).toString(),
        },
        {
          name: 'descripcion',
          type: 'textarea',
          placeholder: 'Descripción',
          value: producto.descripcion ?? '',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: (data: { nombre: string; precio: string; stock: string; descripcion: string }) => {
            const nombre = (data.nombre ?? '').trim();
            const precio = Number(data.precio);
            const stock = Number(data.stock);

            if (nombre && precio > 0) {
              this.productoService.actualizarProducto(producto.id, {
                nombre,
                precio,
                stock: Number.isFinite(stock) ? stock : 0,
                descripcion: data.descripcion ?? '',
              });
              this.mostrarToast('Producto actualizado correctamente');
              return true;
            } else {
              this.mostrarToast('Nombre y precio son obligatorios');
              return false; // evita cerrar el alert
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async eliminarProducto(producto: Producto) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: `¿Eliminar ${producto.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.productoService.eliminarProducto(producto.id);
            this.mostrarToast('Producto eliminado');
          },
        },
      ],
    });

    await alert.present();
  }

  // 🔔 Mensaje que se cierra solo (usa ToastController, aquí sí existe "duration")
  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom', // 'top' | 'middle' | 'bottom'
      color: 'primary',   // opcional: 'success', 'warning', 'danger', etc.
    });
    await toast.present();
  }
}
