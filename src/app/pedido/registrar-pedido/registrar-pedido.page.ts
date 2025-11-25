import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Basedatos } from 'src/app/servicio/basedatos';


@Component({
  selector: 'app-registrar-pedido',
  templateUrl: './registrar-pedido.page.html',
  styleUrls: ['./registrar-pedido.page.scss'],
  standalone: false
})
export class RegistrarPedidoPage implements OnInit {

  listaclientes: any[] = [];
  listaproductos: any[] = [];
  productosseleccionados: any[] = [];
  //productoSeleccionado: Producto | null = null;
  cantidad: number = 1;

  constructor(private router:Router,
    private base:Basedatos) { }

  ngOnInit() {
    this.cargarDatos();
  }



  async cargarDatos(){

  const respuesta=await this.base.obtenerClientes();


  if(respuesta.success){
   this.listaclientes=respuesta.data;
   console.log('clientes cargados en la page de registrar pedidos ',this.listaclientes);
  }else{

   console.error('No se pudieron cargar los clientes:', respuesta.error);
  }

  const resproductos=await this.base.obtenerProductos();
  if(resproductos.success){
  this.listaproductos=resproductos.data;
  console.log('productos cargados en la page de registrar pedidos ',this.listaproductos);
  }else{

   console.error('No se pudieron cargar los productos:', resproductos.error);

  }
  
  }







  volverMenu(){

  const activo = document.activeElement as HTMLElement | null;
    if (activo) {
      activo.blur();
    }

    this.router.navigate(['/menu']);



  }

}
