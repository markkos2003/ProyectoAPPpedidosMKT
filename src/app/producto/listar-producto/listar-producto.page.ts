import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Basedatos } from 'src/app/servicio/basedatos';
import { Alertas } from 'src/app/servicio/alertas';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.page.html',
  styleUrls: ['./listar-producto.page.scss'],
  standalone: false,
})
export class ListarProductoPage implements OnInit {


   producto:string[]=["polo","falda","casaca"];

   listaproductos:any[]=[];


  constructor(private router:Router,
    private based:Basedatos,
    private alerta:Alertas,
    private alertaeliminar:AlertController) {
    this.cargarProductos();
   }

  ngOnInit() {
  }



  registrarproducto(){

  const activo = document.activeElement as HTMLElement | null;
  if (activo) activo.blur();

  this.router.navigate(['/registrar-producto']);


  }


  async cargarProductos() {
    const resultado = await this.based.obtenerProductos();

    if (resultado.success) {
      this.listaproductos = resultado.data;
      console.log('Datos cargados:', this.listaproductos);
    } else {
      console.error('No se pudieron cargar los productos:', resultado.error);
      // Mostrar un mensaje de error al usuario
    
    }
  }


  editarProducto(id:string){

  const activo = document.activeElement as HTMLElement | null;
   if (activo) activo.blur();

   console.log('estoy en esata parte si pude llegar aqui');
   
   this.router.navigate(['/actualizar-producto',id]);

  }

  async eliminarProducto(id:string){
    
    const alerti=await this.alertaeliminar.create({

     header: 'Confirmar eliminación',
     message:`¿Estás seguro que deseas eliminar este producto?`,
     buttons:[
      {text:'CANCELAR', role:'cancel' },
      {text:'ELIMINAR',  
       handler: async()=>{
          try{
           await this.based.eliminarProducto(id) ;

           await this.cargarProductos();
           this.alerta.mostrarMensaje('Producto eliminado correctamente');

          }catch(error:any){

           if(error.codigo==='HAS_ORDERS'){
            
            this.alerta.mostrarDialogo(error.message,'Eliminación bloqueada');

           }else{

             console.log('Error al intentar eliminar: ',error);
             this.alerta.mostrarMensaje('Error al intentar eliminar el producto.');
                     }
                     }
       },
       },
     ],
    },
            );

   await alerti.present();



  }





  volverMenu(){

  const activo = document.activeElement as HTMLElement | null;
    if (activo) {
      activo.blur();
    }

    this.router.navigate(['/menu']);



  }



}
