import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarPedidoPageRoutingModule } from './registrar-pedido-routing.module';

import { RegistrarPedidoPage } from './registrar-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarPedidoPageRoutingModule
  ],
  declarations: [RegistrarPedidoPage]
})
export class RegistrarPedidoPageModule {}
