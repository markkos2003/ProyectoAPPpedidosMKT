import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarClientePage } from './listar-cliente/listar-cliente.page';
import { RegistrarClientePage } from './registrar-cliente/registrar-cliente.page';
import { ActualizarClientePage } from './actualizar-cliente/actualizar-cliente.page';

const routes: Routes = [
  {
    path:'',
    redirectTo:'listar-cliente',
    pathMatch: 'full'
  },
  {
    path:'listar-cliente',
    component: ListarClientePage
  },
  {
    path:'registrar-cliente',
    component: RegistrarClientePage
  },
  {
    path:'actualizar-cliente/:id',
    component: ActualizarClientePage
  }





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
