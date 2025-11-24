import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Basedatos } from 'src/app/servicio/basedatos';
import { Alertas } from 'src/app/servicio/alertas';


@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.page.html',
  styleUrls: ['./listar-producto.page.scss'],
  standalone: false,
})
export class ListarProductoPage implements OnInit {


   producto:string[]=["polo","falda","casaca"];

   listaproductos:any[]=[];


  constructor(private router:Router,private based:Basedatos,private alerta:Alertas) {
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





  volverMenu(){

  const activo = document.activeElement as HTMLElement | null;
    if (activo) {
      activo.blur();
    }

    this.router.navigate(['/menu']);



  }



}
