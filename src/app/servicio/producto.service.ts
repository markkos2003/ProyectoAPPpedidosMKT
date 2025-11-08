import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  descripcion?: string;
  imagen?: string;
  stock?: number;
  fechaRegistro: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productos: Producto[] = [];
  private productosSubject = new BehaviorSubject<Producto[]>([]);

  constructor() {
    this.cargarProductos();
  }

  private cargarProductos() {
    const productosGuardados = localStorage.getItem('productos');
    if (productosGuardados) {
      this.productos = JSON.parse(productosGuardados);
      this.productosSubject.next(this.productos);
    }
  }

  private guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(this.productos));
    this.productosSubject.next(this.productos);
  }

  getProductos(): Observable<Producto[]> {
    return this.productosSubject.asObservable();
  }

  getProductoById(id: string): Producto | undefined {
    return this.productos.find(p => p.id === id);
  }

  agregarProducto(producto: Omit<Producto, 'id' | 'fechaRegistro'>): Producto {
    const nuevoProducto: Producto = {
      ...producto,
      id: Date.now().toString(),
      fechaRegistro: new Date()
    };
    this.productos.push(nuevoProducto);
    this.guardarProductos();
    return nuevoProducto;
  }

  actualizarProducto(id: string, datos: Partial<Producto>): boolean {
    const index = this.productos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.productos[index] = { ...this.productos[index], ...datos };
      this.guardarProductos();
      return true;
    }
    return false;
  }

  eliminarProducto(id: string): boolean {
    const index = this.productos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.productos.splice(index, 1);
      this.guardarProductos();
      return true;
    }
    return false;
  }
}