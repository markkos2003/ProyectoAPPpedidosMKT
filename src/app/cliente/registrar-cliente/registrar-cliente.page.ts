import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mostrar } from 'src/app/mostrar';
import { Basedatos } from 'src/app/servicio/basedatos';
import { LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';


@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.page.html',
  styleUrls: ['./registrar-cliente.page.scss'],
  standalone: false,
})
export class RegistrarClientePage implements OnInit {



  clienteForm: FormGroup;

  constructor(private fb: FormBuilder,
    private basedatos: Basedatos,private toast:Mostrar,
    private loadingCtrl: LoadingController,private router:Router) { 

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
  }

  //registrarCliente(){}




   async registrarCliente() {
    if (this.clienteForm.valid) {
      const loading = await this.loadingCtrl.create({
        message: 'Registrando cliente...',
        spinner: 'crescent'
      });
      await loading.present();

      try {
        const resultado = await this.basedatos.registrarCliente(this.clienteForm.value);
        
        await loading.dismiss();

        if (resultado.success) {
          // Éxito
          await this.toast.mustramensaje('Cliente registrado exitosamente ✓');
          this.clienteForm.reset();
          
          // Opcional: navegar a otra página

          const activo = document.activeElement as HTMLElement | null;
      if (activo) activo.blur();
          this.router.navigate(['/listar-cliente']);
        } else {
          // Error o duplicado
          if (resultado.error && typeof resultado.error === 'string') {
            // Si el error es un mensaje (ej: "Ya existe un cliente con ese DNI")
            await this.toast.mustramensaje('Cliente duplicado');
          } else {
            // Error técnico
            await this.toast.mustramensaje('Error al registrar cliente');
          }
        }
      } catch (error) {
        await loading.dismiss();
        console.error('Error inesperado:', error);
        await this.toast.mustramensaje('Error inesperado al registrar');
      }
    } else {
      // Formulario inválido
      await this.toast.mustramensaje('Complete todos los campos correctamente');
      this.marcarCamposComoTocados();
    }



   



  }


marcarCamposComoTocados() {
    Object.keys(this.clienteForm.controls).forEach(field => {
      const control = this.clienteForm.get(field);
      control?.markAsTouched();
    });
  }






}
