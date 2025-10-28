import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProductoPage } from './listar-producto/listar-producto.page';
import { RegistrarProductoPage } from './registrar-producto/registrar-producto.page';
import { ActualizarProductoPage } from './actualizar-producto/actualizar-producto.page';

const routes: Routes = [


{
    path:'',
    redirectTo:'listar-producto',
    pathMatch: 'full'
  },
  {
    path:'listar-producto',
    component: ListarProductoPage
  },
  {
    path:'registrar-producto',
    component: RegistrarProductoPage
  },
  {
    path:'actualizar-producto/:id',
    component: ActualizarProductoPage
  }










];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
