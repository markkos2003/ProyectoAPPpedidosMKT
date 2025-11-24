import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Basedatos } from 'src/app/servicio/basedatos';
import { Servicioimagen } from 'src/app/servicio/servicioimagen';
import { Alertas } from 'src/app/servicio/alertas';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.page.html',
  styleUrls: ['./actualizar-producto.page.scss'],
  standalone: false,

  
})

export class ActualizarProductoPage implements OnInit {

  productoForm: FormGroup;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  
  
  
  isLoading=false;
  selectedFile: File | null = null;
  imagenPreviewUrl: string | null = null;
  productoActual: any = null;
  imagencamnbiada:boolean=false;
  imagenactual: string | null = null;
  
  productoid:string | null=null;
  constructor(
  private fb:FormBuilder,
  private base:Basedatos,
  private imagservi:Servicioimagen,
  private rutaobtener:ActivatedRoute,
  private alerta:Alertas,
  private ruta:Router,



  ) { 
  this.productoForm=this.fb.group({
  nombre: ['',Validators.required],
  sku: ['',Validators.required],
  genero: ['',Validators.required],
  precio: [null,[Validators.required,Validators.min(0.01)]],
  stock_s: [0, [Validators.required, Validators.min(0)]],
  stock_m:[0,[Validators.required,Validators.min(0)]], 
  stock_l:[0,[Validators.required,Validators.min(0)]],
  descripcion: [''],
  imagen_url: [''],

  });




  }

  ngOnInit() {
   this.productoid=this.rutaobtener.snapshot.paramMap.get('id');

    if(this.productoid){

      this.cargarDatosProducto(this.productoid);

    }else{

      this.alerta.mostrarDialogo('ID DE PRODUCTO NO PROPORCIONADO');
    }

  }


async cargarDatosProducto(id:string){
 

this.alerta.mostrarCarga('cargando datos') ;

try{

const datos=await this.base.obtenerProductoPorId(id);
this.imagenactual=datos.imagen_url;
this.imagenPreviewUrl=datos.imagen_url;

this.productoForm.patchValue({
  nombre:datos.nombre,
  sku:datos.sku,
  genero:datos.genero,
  precio:datos.precio,
  descripcion:datos.descripcion,
  //imagen_url:datos.imagen_url,
  stock_m:datos.stock_por_talla?.M || 0,
  stock_s:datos.stock_por_talla?.S || 0,
  stock_l:datos.stock_por_talla?.L || 0,});
console.log(datos);
}catch(error){


console.error('ERROR AL CARGAR DATOS',error);
this.alerta.mostrarDialogo('ERROR AL CARGAR LOS DATOS DEL CLIENTE');
//this.navegar.back();

}finally{

await this.alerta.ocultarCarga();

}



}



onFileSelected(event: any) {
 const file = event.target.files[0];
  if (file) {
 this.selectedFile = file;
 this.imagencamnbiada=true;
const reader = new FileReader();
reader.onload = (e: any) => {
 this.imagenPreviewUrl = e.target.result; // Para la previsualización
};
 reader.readAsDataURL(file);
 } else {
        this.selectedFile = null;
        this.imagenPreviewUrl = '';
    }
 }

seleccionarImagen() {
    this.fileInput.nativeElement.click();
  }

  eliminarImagen() {
 this.imagenPreviewUrl = '';
    this.selectedFile = null;
 this.fileInput.nativeElement.value = '';
}




async actualizarProducto(){
if(this.productoForm.valid && this.productoid){

this.alerta.mostrarCarga('Guardando datos');
let finalImageUrl: string = '';
let datosactualizados={...this.productoForm.value}

try{

if(this.imagencamnbiada){

finalImageUrl=await this.imagservi.subirImagen(this.selectedFile as File);
//this.imagenactual=finalImageUrl;
datosactualizados.imagen_url=finalImageUrl;
console.log('si llegue aqui para actualiazar la imagen')
}else{
datosactualizados.imagen_url=this.imagenactual;

}





await this.base.editarProducto(this.productoid,datosactualizados);

await this.alerta.mostrarDialogo('Producto actualizado exitosamente ');

const activo=document.activeElement as HTMLElement | null;
if(activo)activo.blur();
this.ruta.navigate(['/listar-producto']);


}catch(error:any){


console.error('Error al actualizar por :',error);

const mensajeError=error.message || 'Error desconocido al actualizar cliente';
await this.alerta.mostrarDialogo(mensajeError);


}finally{
  this.imagencamnbiada=false;
  this.alerta.ocultarCarga();
}





}



else{

//formulario invalido

await this.alerta.mostrarMensaje('Complete todos los campos');
this.marcarCamposComoTocados();

}
}

marcarCamposComoTocados() {
    Object.keys(this.productoForm.controls).forEach(field => {
      const control = this.productoForm.get(field);
      control?.markAsTouched();
    });
  }

cancelar(){

const activo=document.activeElement as HTMLElement | null;
if(activo)activo.blur();
this.ruta.navigate(['/listar-producto']);


}




}




