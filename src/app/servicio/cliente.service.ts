import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Cliente {
  id: string;
  nombre: string;
  telefono: string;
  dni?: string;
  ruc?: string;
  direccion?: string;
  correo?: string;
  fechaRegistro: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clientes: Cliente[] = [];
  private clientesSubject = new BehaviorSubject<Cliente[]>([]);

  constructor() {
    this.cargarClientes();
  }

  private cargarClientes() {
    const clientesGuardados = localStorage.getItem('clientes');
    if (clientesGuardados) {
      this.clientes = JSON.parse(clientesGuardados);
      this.clientesSubject.next(this.clientes);
    }
  }

  private guardarClientes() {
    localStorage.setItem('clientes', JSON.stringify(this.clientes));
    this.clientesSubject.next(this.clientes);
  }

  getClientes(): Observable<Cliente[]> {
    return this.clientesSubject.asObservable();
  }

  getClienteById(id: string): Cliente | undefined {
    return this.clientes.find(c => c.id === id);
  }

  agregarCliente(cliente: Omit<Cliente, 'id' | 'fechaRegistro'>): Cliente {
    const nuevoCliente: Cliente = {
      ...cliente,
      id: Date.now().toString(),
      fechaRegistro: new Date()
    };
    this.clientes.push(nuevoCliente);
    this.guardarClientes();
    return nuevoCliente;
  }

  actualizarCliente(id: string, datos: Partial<Cliente>): boolean {
    const index = this.clientes.findIndex(c => c.id === id);
    if (index !== -1) {
      this.clientes[index] = { ...this.clientes[index], ...datos };
      this.guardarClientes();
      return true;
    }
    return false;
  }

  eliminarCliente(id: string): boolean {
    const index = this.clientes.findIndex(c => c.id === id);
    if (index !== -1) {
      this.clientes.splice(index, 1);
      this.guardarClientes();
      return true;
    }
    return false;
  }
}