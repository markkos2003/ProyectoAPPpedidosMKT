import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Basedatos } from '../servicio/basedatos';
import { Alertas } from '../servicio/alertas';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./visualizar.page.scss'],
  standalone: false,
})
export class VisualizarPage implements OnInit {

listapedidos:any []=[];
pedidosFiltrados: any []=[];
terminoBusqueda:string="";
filtroestado:string='todos';



  constructor(private router:Router,
    private base:Basedatos,
    private alerta:Alertas,
    private alertacambio:AlertController
  ) { }

  ngOnInit() {
    this.cargarPedidos();
  }

  ionViewWillEnter(){
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

    if(this.filtroestado !='todos'){

      resultado=resultado.filter(p=>p.estado===this.filtroestado);
    }

    //filtros
    if(this.terminoBusqueda.trim()){
      const termino=this.terminoBusqueda.toLowerCase();
      resultado=resultado.filter(
       pedido=>{
        const nombreCliente=pedido.cliente.nombre.toLowerCase().includes(termino);
        const nombreProducto=pedido.item.some(

          item=>item.nombreproducto.toLowerCase().includes(termino)

        );
         return nombreCliente || nombreProducto;
       }
      );
    }

  this.pedidosFiltrados=resultado;

}


filtrarPorEstado(estado:string){
   this.filtroestado=estado;
   this.aplicarFiltros();
}  

buscarPedidos(){
  this.aplicarFiltros();
}

async cambiarEstado(pedido:any){
const alertamostrar=await this.alertacambio.create({
  header:'Cambiar Estado',
  message:`Estado actual: ${pedido.estado.toUpperCase()}`,
  inputs:[{
    type:'radio',
    label:'Entregado(Cierra pedido)',
    value:'entregado',
    checked:pedido.estado==='entregado',
  },
  {
    type:'radio',
    label:'Cancelado(DevuelveStock)',
    value:'cancelado',
    checked:pedido.estado==='cancelado',
  },
  {
    type:'radio',
    label:'En proceso',
    value:'en proceso',
    checked:pedido.estado==='en proceso',
  }],
  buttons:[{
    text:'Cancelar',role:'cancel'
  },{
    text:'Guardar Cambio',
    handler:async(nuevoEstado)=>{
      if(!nuevoEstado)return;

      if(nuevoEstado==='cancelado'){
        const seguro=await this.alerta.dialogoConfirmacion(
          '¿Devolver al stock?','Al cancelar, las prendas volverán a estar disponibles para la venta');
          if(!seguro)return;
           
      }
      const res=await this.base.cambiarEstadoPedido(pedido,nuevoEstado);

      if(res.success){

        this.alerta.mostrarMensaje('Estado actualizado correctamente');
        this.cargarPedidos();
      }else{

        this.alerta.mostrarMensaje('Error al actualizar el estado');

      }
    }
  }]
});

await alertamostrar.present();


}












volverMenu(){

  const activo = document.activeElement as HTMLElement | null;
    if (activo) {
      activo.blur();
    }

    this.router.navigate(['/menu']);



  }

}
