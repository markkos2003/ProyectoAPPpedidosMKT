import { Component, OnInit, inject } from '@angular/core';
import {Router} from '@angular/router';
import { Mostrar } from '../mostrar';
import { Basedatos } from '../servicio/basedatos';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  correo: string = '' ;
  password: string = '';
  errorMessage: string = '';

 

  constructor(private router: Router,private miservicio:Mostrar) { }


  serviciobasedatos=inject(Basedatos);




  async login() {
    
    
    // validacion previa
    if (!this.correo || !this.password) {
      this.miservicio.mustramensaje('Debe ingresar un correo electrónico y una contraseña.');
      this.limpiarFormulario();
      // Retornamos 
      return; 
    }

    try {
      
      // PASO 2: Llama a signIn si la validación es exitosa
      
      const res = await this.serviciobasedatos.signIn(this.correo, this.password);

      // Lógica de éxito:
      const activo = document.activeElement as HTMLElement | null;
      if (activo) activo.blur();

      this.router.navigate(['/menu']);
      console.log(res);

    } catch (error: any) {
      
      //  Manejo de Errores de Firebase
      
      console.error("Error de autenticación capturado y manejado:", error);

      let mensajeMostrar = 'Error al iniciar sesión';

      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        // Unificamos los errores comunes de credenciales incorrectas
        mensajeMostrar = 'Usuario o contraseña incorrectos.';
      } else if (error.code === 'auth/invalid-email') {
        mensajeMostrar = 'El formato del correo electrónico es incorrecto.';
      } else {
        mensajeMostrar = 'Error desconocido. Inténtelo de nuevo.';
      }
      
      this.miservicio.mustramensaje(mensajeMostrar);
    }
    
    this.limpiarFormulario();
  }







  limpiarFormulario(){
     this.correo="";
     this.password="";
     this.errorMessage="";

  }



  ngOnInit() {





  }

}
