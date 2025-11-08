import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false,
})
export class MenuPage implements OnInit {
  
  constructor(private router: Router) { }

  abrirclientes() {
    const activo = document.activeElement as HTMLElement | null;
    if (activo) activo.blur();
    this.router.navigate(['/listar-cliente']);  // Corregido
  }

  abrirproducto() {
    const activo = document.activeElement as HTMLElement | null;
    if (activo) activo.blur();
    this.router.navigate(['/listar-producto']);  // Corregido
  }

  abrirpedido() {
    const activo = document.activeElement as HTMLElement | null;
    if (activo) activo.blur();
    this.router.navigate(['/registrar-pedido']);  // ✅ CORRECCIÓN AQUÍ
  }

  abrirvisualizar() {
    const activo = document.activeElement as HTMLElement | null;
    if (activo) activo.blur();
    this.router.navigate(['/visualizar']);
  }

  ngOnInit() {
  }
}