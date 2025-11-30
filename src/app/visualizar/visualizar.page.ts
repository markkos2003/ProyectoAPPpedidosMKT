import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Basedatos } from '../servicio/basedatos';
import { Alertas } from '../servicio/alertas';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./visualizar.page.scss'],
  standalone: false,
})
export class VisualizarPage implements OnInit {

listapedidos:any []=[];
pedidosFiltrados: any []=[];



  constructor(private router:Router,
    private base:Basedatos,
    private alerta:Alertas
  ) { }

  ngOnInit() {
    this.cargarPedidos();
  }

async cargarPedidos(){

  const respuesta=await this.base.obtenerPedidos();
  if(respuesta.success){

    this.listapedidos=respuesta.data;
    console.log(this.listapedidos);
    this.aplicarFiltros();

  }else{

    console.error("No se pudo traer los pedidos por ",respuesta.error);
  }


}



getColorEstado(estado: string): string {
    switch (estado) {
      case 'en proceso':
        return 'warning';
      case 'cancelado':
        return 'danger';
      case 'recibido':
        return 'success';
      default:
        return 'medium';
    }
  }


aplicarFiltros(){

  let resultado=[...this.listapedidos];
  //filtros



  this.pedidosFiltrados=resultado;


}


  














volverMenu(){

  const activo = document.activeElement as HTMLElement | null;
    if (activo) {
      activo.blur();
    }

    this.router.navigate(['/menu']);



  }

}
