import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarProductoPageRoutingModule } from './registrar-producto-routing.module';

import { RegistrarProductoPage } from './registrar-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarProductoPageRoutingModule
  ],
  declarations: [RegistrarProductoPage]
})
export class RegistrarProductoPageModule {}
