import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarProductoPage } from './registrar-producto.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarProductoPageRoutingModule {}
