import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.page.html',
  styleUrls: ['./listar-cliente.page.scss'],
  standalone: false,
})
export class ListarClientePage implements OnInit {


  cliente:string[]=["juan","matias","federico"];

  constructor(private router:Router) { }

  ngOnInit() {
  }


  IrregistrarCliente(){

  const activo = document.activeElement as HTMLElement | null;
  if (activo) activo.blur();

  this.router.navigate(['/registrar-cliente']);


  }


  editarCliente(indice:number){
   const activo = document.activeElement as HTMLElement | null;
   if (activo) activo.blur();

  this.router.navigate(['/actualizar-cliente']);


  }


  eliminarCliente(indice:number){}



}
