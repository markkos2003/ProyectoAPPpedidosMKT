import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Servicioimagen } from 'src/app/servicio/servicioimagen';
import { Alertas } from 'src/app/servicio/alertas';
import { Basedatos } from 'src/app/servicio/basedatos';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.page.html',
  styleUrls: ['./registrar-producto.page.scss'],
  standalone: false,
  
})
export class RegistrarProductoPage implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // Propiedades para la imagen
  selectedFile: File | null = null;
  imagenPreviewUrl: string = ''; // Usado para mostrar la imagen seleccionada
  isLoading: boolean = false;


   productoForm!: FormGroup;

  

  constructor(private router:Router,
    private fb:FormBuilder,
  private servicioimag:Servicioimagen,
 private alerta:Alertas,
private basedato:Basedatos) { 








}



  seleccionarImagen() {
    this.fileInput.nativeElement.click();
  }


   onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
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
  

  eliminarImagen() {
    this.imagenPreviewUrl = '';
    this.selectedFile = null;
    this.fileInput.nativeElement.value = '';
  }


  





  ngOnInit() {

    this.productoForm = this.fb.group({
        // Datos Esenciales del Producto Base
        nombre: ['', Validators.required],
        sku: ['', Validators.required],
        genero: ['Unisex', Validators.required], // Valor por defecto
        precio: [0, [Validators.required, Validators.min(0.01)]],
        descripcion: [''],
        
        // El Stock por Talla (Inicializamos con 0)
        stock_s: [0, [Validators.required, Validators.min(0)]],
        stock_m: [0, [Validators.required, Validators.min(0)]],
        stock_l: [0, [Validators.required, Validators.min(0)]]
    });




  }



    async registrarProducto() {
    // Validación principal
    if (this.productoForm.invalid || !this.selectedFile) {
      await this.alerta.mostrarDialogo('Error', 'Completa los campos obligatorios y selecciona una imagen.');
      return;
    }
    
    this.isLoading = true;
    let finalImageUrl: string = '';
    
    try {
        // 1. Subida a Cloudinary
        await this.alerta.mostrarDialogo('Procesando', 'Subiendo imagen...');
        finalImageUrl = await this.servicioimag.subirImagen(this.selectedFile as File);

        // 2. Construir el objeto final con el mapa de stock
        const formValue = this.productoForm.value;
        const productoParaGuardar = {
            nombre: formValue.nombre,
            sku: formValue.sku,
            genero: formValue.genero,
            precio: formValue.precio,
            descripcion: formValue.descripcion,
            imagen_url: finalImageUrl, // URL final de Cloudinary
            
            // Construimos el mapa de stock a partir de los controles individuales
            stock_por_talla: {
                S: formValue.stock_s,
                M: formValue.stock_m,
                L: formValue.stock_l,
            },
            fechaRegistro: new Date()
        };

        // 3. Guardar en Firestore
        await this.basedato.guardarProducto(productoParaGuardar); // Tu servicio debe manejar el addDoc a Firestore
      
        await this.alerta.mostrarDialogo('Éxito', 'Producto registrado correctamente');
        this.limpiarFormulario();
        this.router.navigate(['/listar-producto']);
    } catch (error) {
        console.error("Error completo:", error);
        await this.alerta.mostrarDialogo('Error', 'No se pudo registrar el producto.');
    } finally {
        this.isLoading = false;
    }
  }






  limpiarFormulario() {
    this.productoForm.reset({
        // Valores por defecto al resetear
        nombre: '', sku: '', genero: 'Unisex', precio: 0, descripcion: '',
        stock_s: 0, stock_m: 0, stock_l: 0
    });
    this.imagenPreviewUrl = '';
    this.selectedFile = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }





  volverMenu(){

  const activo = document.activeElement as HTMLElement | null;
    if (activo) {
      activo.blur();
    }

    this.router.navigate(['/listar-producto']);



  }



}
