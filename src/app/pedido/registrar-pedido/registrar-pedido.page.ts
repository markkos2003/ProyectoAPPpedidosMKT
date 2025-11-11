import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';


@Component({
  selector: 'app-registrar-pedido',
  templateUrl: './registrar-pedido.page.html',
  styleUrls: ['./registrar-pedido.page.scss'],
  standalone: false
})
export class RegistrarPedidoPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }




  volverMenu(){

  const activo = document.activeElement as HTMLElement | null;
    if (activo) {
      activo.blur();
    }

    this.router.navigate(['/menu']);



  }

}
