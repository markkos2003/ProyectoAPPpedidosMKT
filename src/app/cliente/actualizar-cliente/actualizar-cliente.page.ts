import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Mostrar } from 'src/app/mostrar';
import { Basedatos } from 'src/app/servicio/basedatos';

@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.page.html',
  styleUrls: ['./actualizar-cliente.page.scss'],
  standalone: false,
})
export class ActualizarClientePage implements OnInit {

  clienteForm: FormGroup;
  clienteId: string | null = null; // Variable para almacenar el ID del cliente a editar

  constructor(
private fb:FormBuilder,
private based:Basedatos,
private muestra:Mostrar,
private imagcarga:LoadingController,
private ruta:Router,
private rutaobtener:ActivatedRoute,
private navegar:NavController




  ) { 

this.clienteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      dni: ['', [Validators.pattern(/^[0-9]{8}$/)]],
      ruc: ['', [Validators.pattern(/^[0-9]{11}$/)]],
      direccion: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]]
    });







  }

  ngOnInit() {

    this.clienteId=this.rutaobtener.snapshot.paramMap.get('id');

    if(this.clienteId){
       this.cargarDatosCliente(this.clienteId);

    }else{

      //si no hay id puede ser error o navegacion incorrecta

      this.muestra.mustramensaje('ID de cliente no proporcionado');
      this.navegar.back();

    }





  }


//-------------------------------------------------------------------------------

//cargar los datos del clente seleccionado


async cargarDatosCliente(id:string){


const loading= await this.imagcarga.create(

{ message:'Cargando datos...',
  spinner:'crescent'}
                    


);
await loading.present();

try{

const datos=await this.based.obtenerClientePorId(id);
await loading.dismiss();
this.clienteForm.patchValue(datos);
}catch(error){

await loading.dismiss();
console.error('ERROR AL CARGAR DATOS',error);
this.muestra.mustramensaje('ERROR AL CARGAR LOS DATOS DEL CLIENTE');
this.navegar.back();

}



}

//---------------------------------------------------------------------------------


//actualizacion de datos,guardar cambios

async guardarcambios(){
if(this.clienteForm.valid && this.clienteId)
{  const loading=await this.imagcarga.create(

  {message:'Actualizando Cliente...',
    spinner:'crescent'
  }
); 
await loading.present();

try{

await this.based.editarCliente(this.clienteId,this.clienteForm.value);
await loading.dismiss();
await this.muestra.mustramensaje('Cliente actualizado exitosamente ');

const activo=document.activeElement as HTMLElement | null;
if(activo)activo.blur();
this.ruta.navigate(['/listar-cliente']);


}catch(error:any){

await loading.dismiss();
console.error('Error al actualizar por :',error);

const mensajeError=error.message || 'Error desconocido al actualizar cliente';
await this.muestra.mustramensaje(mensajeError);


}

}else{

//formulario invalido

await this.muestra.mustramensaje('Complete todos los ampos');
this.marcarCamposComoTocado();

}


}

//-------------------------------------------------------------------------------------


cancelarEdicion(){
  this.navegar.back();
}

marcarCamposComoTocado(){
Object.keys(this.clienteForm.controls).forEach(
field=>{ const control=this.clienteForm.get(field); 
control?.markAsTouched(); 
                                     }




);


}

cancelar(){

     this.clienteForm.reset();

      const activo = document.activeElement as HTMLElement | null;
      if (activo) activo.blur();
          this.ruta.navigate(['/listar-cliente']);

  }



}
