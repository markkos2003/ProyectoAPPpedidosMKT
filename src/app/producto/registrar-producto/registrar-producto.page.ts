import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.page.html',
  styleUrls: ['./registrar-producto.page.scss'],
  standalone: false,
})
export class RegistrarProductoPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }





  volverMenu(){

  const activo = document.activeElement as HTMLElement | null;
    if (activo) {
      activo.blur();
    }

    this.router.navigate(['/listar-producto']);



  }



}
