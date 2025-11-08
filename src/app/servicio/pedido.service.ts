import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type EstadoPedido = 'proceso' | 'cancelado' | 'recibido';

export interface ItemPedido {
  productoId: string;
  productoNombre: string;
  cantidad: number;
  precio: number;
  subtotal: number;
}

export interface Pedido {
  id: string;
  clienteId: string;
  clienteNombre: string;
  items: ItemPedido[];
  total: number;
  estado: EstadoPedido;
  fecha: Date;
  notas?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private pedidos: Pedido[] = [];
  private pedidosSubject = new BehaviorSubject<Pedido[]>([]);

  constructor() {
    this.cargarPedidos();
  }

  private cargarPedidos() {
    const pedidosGuardados = localStorage.getItem('pedidos');
    if (pedidosGuardados) {
      this.pedidos = JSON.parse(pedidosGuardados);
      this.pedidosSubject.next(this.pedidos);
    }
  }

  private guardarPedidos() {
    localStorage.setItem('pedidos', JSON.stringify(this.pedidos));
    this.pedidosSubject.next(this.pedidos);
  }

  getPedidos(): Observable<Pedido[]> {
    return this.pedidosSubject.asObservable();
  }

  getPedidoById(id: string): Pedido | undefined {
    return this.pedidos.find(p => p.id === id);
  }

  getPedidosPorEstado(estado: EstadoPedido): Pedido[] {
    return this.pedidos.filter(p => p.estado === estado);
  }

  agregarPedido(pedido: Omit<Pedido, 'id' | 'fecha'>): Pedido {
    const nuevoPedido: Pedido = {
      ...pedido,
      id: Date.now().toString(),
      fecha: new Date()
    };
    this.pedidos.push(nuevoPedido);
    this.guardarPedidos();
    return nuevoPedido;
  }

  actualizarEstadoPedido(id: string, estado: EstadoPedido): boolean {
    const index = this.pedidos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.pedidos[index].estado = estado;
      this.guardarPedidos();
      return true;
    }
    return false;
  }

  eliminarPedido(id: string): boolean {
    const index = this.pedidos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.pedidos.splice(index, 1);
      this.guardarPedidos();
      return true;
    }
    return false;
  }
}