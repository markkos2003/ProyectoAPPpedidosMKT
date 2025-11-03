import { Injectable,inject } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { 
  Firestore, 
  collection, 
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where
} from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class Basedatos {


  

  constructor(private auth: AngularFireAuth,private conexion: Firestore){}


  /*signIn(user:User){

    return signInWithEmailAndPassword(getAuth(),user.email,user.password);
  }*/


    signIn(correo:string,paas:string){

    return this.auth.signInWithEmailAndPassword(correo,paas);
  }



  //METODOS MODULO CLIENTE

  async registrarCliente(cliente: any) {
    try {
      const clientesRef = collection(this.conexion, 'clientes');
      const docRef = await addDoc(clientesRef, {
        nombre: cliente.nombre,
        telefono: cliente.telefono,
        dni: cliente.dni || '',
        ruc: cliente.ruc || '',
        direccion: cliente.direccion,
        correo: cliente.correo,
        fechaRegistro: new Date(),
        activo: true
      });
      
      console.log('Cliente registrado con ID:', docRef.id);
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error al registrar cliente:', error);
      return { success: false, error };
    }
  }



  
}
