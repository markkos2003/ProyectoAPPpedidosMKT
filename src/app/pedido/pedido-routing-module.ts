import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarPedidoPage } from './registrar-pedido/registrar-pedido.page';

const routes: Routes = [

{
    path:'',
    redirectTo:'registrar-pedido',
    pathMatch: 'full'
  },
  {
    path:'registrar-pedido',
    component: RegistrarPedidoPage
  },









];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
