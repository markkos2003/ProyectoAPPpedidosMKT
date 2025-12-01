import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Servicioimagen } from 'src/app/servicio/servicioimagen';
import { Alertas } from 'src/app/servicio/alertas';
import { Basedatos } from 'src/app/servicio/basedatos';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


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
  archivoListoParaCloudinary: any = null;


   productoForm!: FormGroup;

  

  constructor(private router:Router,
    private fb:FormBuilder,
  private servicioimag:Servicioimagen,
 private alerta:Alertas,
private basedato:Basedatos) { 








}




async probarCamara() {


try{
// Esto abrirá la interfaz de PWA Elements
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl, // Base64 directo
      source: CameraSource.Camera
    });

    // Si funciona, la imagen se guardará aquí
    this.imagenPreviewUrl = image.dataUrl!;
    this.selectedFile=null;
    this.archivoListoParaCloudinary = this.dataURLtoBlob(image.dataUrl!);



}catch(error){
  console.log("El usuario cerro la camara o hubo error ",error);
}
  
    
  }


  dataURLtoBlob(dataurl: string) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)![1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type:mime});
}



  seleccionarImagen() {
    this.fileInput.nativeElement.click();
  }


   onFileSelected(event: any) {
 const file = event.target.files[0];
  if (file) {
 this.selectedFile = file;
 this.archivoListoParaCloudinary=null;
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
    this.archivoListoParaCloudinary=null;
  }


  





  ngOnInit() {

    this.productoForm = this.fb.group({
        // Datos Esenciales del Producto Base
        nombre: ['', Validators.required],
        sku: ['', Validators.required],
        genero: ['Unisex', Validators.required],
        tipo: ['', Validators.required], // Valor por defecto
        precio: [0, [Validators.required, Validators.min(0.01)]],
        descripcion: [''],
        
        // El Stock por Talla (Inicializamos con 0)
        stock_s: [0, [Validators.required, Validators.min(0)]],
        stock_m: [0, [Validators.required, Validators.min(0)]],
        stock_l: [0, [Validators.required, Validators.min(0)]]
    });




  }



    async registrarProducto() {

      const archivoFinal = this.archivoListoParaCloudinary || this.selectedFile;
    // Validación principal
    if (this.productoForm.invalid || !archivoFinal) {
      await this.alerta.mostrarMensaje( 'Completa los campos obligatorios y selecciona una imagen.');
      return;
    }
    
    this.isLoading = true;
    let finalImageUrl: string = '';
    
    try {
        // 1. Subida a Cloudinary
        //await this.alerta.mostrarDialogo('Procesando', 'Subiendo imagen...');
        console.log('subiendo imagen en el page registrar');
        finalImageUrl = await this.servicioimag.subirImagen(archivoFinal);

        // 2. Construir el objeto final con el mapa de stock
        const formValue = this.productoForm.value;
        const productoParaGuardar = {
            nombre: formValue.nombre,
            sku: formValue.sku,
            genero: formValue.genero,
            tipo:formValue.tipo,
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
      
        await this.alerta.mostrarMensaje( 'Producto registrado correctamente');
        this.limpiarFormulario();
        this.router.navigate(['/listar-producto']);
    } catch (error) {
        console.error("Error completo:", error);
        await this.alerta.mostrarMensaje('No se pudo registrar el producto.');
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
    this.archivoListoParaCloudinary = null; // Borra el Blob
  
  }





  volverMenu(){

  const activo = document.activeElement as HTMLElement | null;
    if (activo) {
      activo.blur();
    }

    this.router.navigate(['/listar-producto']);



  }



}
