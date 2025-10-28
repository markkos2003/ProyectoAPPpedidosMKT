import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  cliente:string[]=["juan","matias","federico"];

  constructor() {}

  editarCliente(indice:number){}


  eliminarCliente(indice:number){}

}
