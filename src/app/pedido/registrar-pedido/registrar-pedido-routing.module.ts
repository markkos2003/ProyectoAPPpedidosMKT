import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarPedidoPage } from './registrar-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarPedidoPageRoutingModule {}
