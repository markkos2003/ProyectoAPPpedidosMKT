import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';


@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.page.html',
  styleUrls: ['./listar-producto.page.scss'],
  standalone: false,
})
export class ListarProductoPage implements OnInit {


   producto:string[]=["polo","falda","casaca"];




  constructor(private router:Router) { }

  ngOnInit() {
  }



  registrarproducto(){

  const activo = document.activeElement as HTMLElement | null;
  if (activo) activo.blur();

  this.router.navigate(['/registrar-producto']);


  }





  volverMenu(){

  const activo = document.activeElement as HTMLElement | null;
    if (activo) {
      activo.blur();
    }

    this.router.navigate(['/menu']);



  }



}
