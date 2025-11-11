import { Component, OnInit, inject } from '@angular/core';
import {Router} from '@angular/router';
import { Mostrar } from '../mostrar';
import { Basedatos } from '../servicio/basedatos';

import { getAuth, signInWithEmailAndPassword} from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  username: string = '' ;
  password: string = '';
  errorMessage: string = '';

 //auth = getAuth();

  constructor(private router: Router,private miservicio:Mostrar) { }


  serviciobasedatos=inject(Basedatos);




  login(){

  this.serviciobasedatos.signIn(this.username,this.password).then(

res=>{

  const activo = document.activeElement as HTMLElement | null;
  if (activo) activo.blur();


  this.router.navigate(['/menu']);


  console.log(res);
}


  ).catch((error)=>{

    if(error.code==='auth/wromg-password'){

      this.miservicio.mustramensaje('contraseña incorrecta');
    }else{

      this.miservicio.mustramensaje('error al iniciar sesión');
    }



  }

  )


   this.limpiarFormulario();

  }



/*signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Aquí el usuario se ha autenticado correctamente
    const user = userCredential.user; // Puedes acceder a sus datos
    console.log('Usuario autenticado', user.email);
  })
  .catch((error) => {
    // Si hubo error (correo o contraseña incorrecta)
    console.error('Error de login:', error.message);
  });*/



  /*login() {
    // Simulación de validación (remplazar con lógica real)
    if (this.username === 'usuario' && this.password === '1234') {

      const activo = document.activeElement as HTMLElement | null;
      if (activo) activo.blur();




      this.router.navigateByUrl('/menu');
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
      this.miservicio.mustramensaje(this.errorMessage);
    }

    this.limpiarFormulario();


  }*/


  /*const auth = getAuth();
  signInWithEmailAndPassword(auth, this.username, this.password)
    .then((userCredential) => {
      // Login exitoso, redirigir a menú
      this.router.navigateByUrl('/menu');
      this.limpiarFormulario();
    })
    .catch((error) => {
      // Error en credenciales
      this.errorMessage = 'Usuario o contraseña incorrectos';
      this.miservicio.mustramensaje(this.errorMessage);
    });*/




  limpiarFormulario(){
     this.username="";
     this.password="";
     this.errorMessage="";

  }



  ngOnInit() {





  }

}
