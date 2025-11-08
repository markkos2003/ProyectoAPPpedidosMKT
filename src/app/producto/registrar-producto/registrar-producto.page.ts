import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProductoService } from '../../servicio/producto.service';

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.page.html',
  styleUrls: ['./registrar-producto.page.scss'],
  standalone: false,
})
export class RegistrarProductoPage {
  
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  producto = {
    nombre: '',
    precio: 0,
    descripcion: '',
    imagen: '',
    stock: 0
  };

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private alertController: AlertController
  ) {}

  seleccionarImagen() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.producto.imagen = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  eliminarImagen() {
    this.producto.imagen = '';
    this.fileInput.nativeElement.value = '';
  }

  async registrarProducto() {
    if (!this.producto.nombre.trim() || this.producto.precio <= 0) {
      await this.mostrarAlert('Error', 'Nombre y precio son obligatorios');
      return;
    }

    try {
      this.productoService.agregarProducto(this.producto);
      await this.mostrarAlert('Éxito', 'Producto registrado correctamente');
      this.limpiarFormulario();
      this.router.navigate(['/listar-producto']);
    } catch (error) {
      await this.mostrarAlert('Error', 'No se pudo registrar el producto');
    }
  }

  limpiarFormulario() {
    this.producto = {
      nombre: '',
      precio: 0,
      descripcion: '',
      imagen: '',
      stock: 0
    };
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  async mostrarAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}


