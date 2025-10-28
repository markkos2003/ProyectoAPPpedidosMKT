import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'listar-cliente',
    loadChildren: () => import('./cliente/listar-cliente/listar-cliente.module').then( m => m.ListarClientePageModule)
  },
  {
    path: 'registrar-cliente',
    loadChildren: () => import('./cliente/registrar-cliente/registrar-cliente.module').then( m => m.RegistrarClientePageModule)
  },
  {
    path: 'actualizar-cliente',
    loadChildren: () => import('./cliente/actualizar-cliente/actualizar-cliente.module').then( m => m.ActualizarClientePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente-module').then( m => m.ClienteModule)
  },
  {
    path: 'listar-producto',
    loadChildren: () => import('./producto/listar-producto/listar-producto.module').then( m => m.ListarProductoPageModule)
  },
  {
    path: 'registrar-producto',
    loadChildren: () => import('./producto/registrar-producto/registrar-producto.module').then( m => m.RegistrarProductoPageModule)
  },
  {
    path: 'actualizar-producto',
    loadChildren: () => import('./producto/actualizar-producto/actualizar-producto.module').then( m => m.ActualizarProductoPageModule)
  },
  {
    path: 'producto',
    loadChildren: () => import('./producto/producto-module').then( m => m.ProductoModule)
  },
  {
    path: 'visualizar',
    loadChildren: () => import('./visualizar/visualizar.module').then( m => m.VisualizarPageModule)
  },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
