import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Servicioimagen {

  // en tu ImagenService
private CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/der5glsj3/image/upload';
// Reemplaza con el nombre de tu nube

private UPLOAD_PRESET = 'cloudiproducto';
// Usa el preset que acabas de crear


constructor(private http:HttpClient){}


   async subirImagen(file: File): Promise<string> {
    
    //  USAR FORMDATA (no objeto JSON)
    const formData = new FormData();
    formData.append('file', file); // Enviar el archivo directamente
    formData.append('upload_preset', this.UPLOAD_PRESET);

    try {
      const response: any = await firstValueFrom(
        this.http.post(this.CLOUDINARY_URL, formData)
      );
      
      console.log(' Imagen subida correctamente:', response.secure_url);
      return response.secure_url;

    } catch (error: any) {
      console.error(' FALLO AL SUBIR A CLOUDINARY:', error);
      console.error('Detalles del error:', error.error);
      throw new Error('FALLO AL SUBIR LA IMAGEN');
    }
  }



  
}
