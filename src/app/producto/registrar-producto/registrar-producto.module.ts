import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {  ReactiveFormsModule } from '@angular/forms';

import { RegistrarProductoPageRoutingModule } from './registrar-producto-routing.module';

import { RegistrarProductoPage } from './registrar-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarProductoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistrarProductoPage]
})
export class RegistrarProductoPageModule {}
