import { Injectable,inject } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { 
  Firestore, 
  collection, 
  addDoc,
  getDocs,getDoc,
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

async obtenerClientes() {
    try {
      // 1. Obtener la referencia a la colección 'clientes'
      const clientesRef = collection(this.conexion, 'clientes');

      // 2. Ejecutar la consulta para obtener todos los documentos
      const querySnapshot = await getDocs(clientesRef);

      // 3. Mapear los documentos a un array de objetos cliente
      const clientes = querySnapshot.docs.map(doc => {
        return {
          id: doc.id, // Incluir el ID del documento
          ...doc.data() // Incluir todos los campos del documento
        };
      });

      console.log('Clientes obtenidos:', clientes);
      return { success: true, data: clientes };
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      return { success: false, error };
    }
  }

  async eliminarCliente(clienteId: string) {
    // 1. Verificar Referencias (Mantenemos la lógica de bloqueo)
    const pedidosRef = collection(this.conexion, 'pedidos');
    const q = query(pedidosRef, where('clienteId', '==', clienteId));
    const pedidosSnapshot = await getDocs(q);

    if (!pedidosSnapshot.empty) {
        // 🔴 Lanzar un error con un código específico si hay pedidos
        const error = new Error('Restricción de datos: El cliente tiene pedidos asociados.');
        (error as any).codigo = 'HAS_ORDERS'; // Añadir una propiedad personalizada al error
        throw error;
    }

    // 2. Eliminar
    const docRef = doc(this.conexion, 'clientes', clienteId);
    await deleteDoc(docRef);

    // Si llega aquí, la eliminación fue exitosa (no necesitamos devolver nada)
}


async editarCliente(id: string, datosActualizados: any): Promise<void> {
    try {
        const clienteRef = doc(this.conexion, 'clientes', id);

        // Realiza la actualización del documento en Firestore
        await updateDoc(clienteRef, datosActualizados);

        // Si la promesa se resuelve, la función sale exitosamente (no devuelve nada)
        
    } catch (error) {
        // 🔴 Lanza el error capturado para que sea manejado por el componente
        console.error('Error en el servicio al actualizar cliente:', error);
        
        // Podemos lanzar un nuevo error más descriptivo o el original
        throw new Error('Fallo la actualización en la base de datos. Intente de nuevo.');
    }
}




async obtenerClientePorId(id: string): Promise<any> {
    const docRef = doc(this.conexion, 'clientes', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }; // Devuelve los datos con el ID
    } else {
        // Lanza un error si no encuentra el cliente
        throw new Error('Cliente no encontrado.');
    }
}




  
}
