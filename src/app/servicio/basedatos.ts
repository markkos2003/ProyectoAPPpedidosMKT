import { Injectable,inject } from '@angular/core';
import { 
  // 1. Nuevas Importaciones de Auth
  Auth, // El servicio inyectable de AngularFire para Auth
  signInWithEmailAndPassword // La función modular que usaremos
} from '@angular/fire/auth';
import { 
  Firestore, 
  collection, 
  addDoc,
  getDocs,getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  runTransaction
} from '@angular/fire/firestore';






@Injectable({
  providedIn: 'root'
})
export class Basedatos {


  

  // 2. Inyección de Auth Modular
  // Inyectamos Auth en lugar de AngularFireAuth
  constructor(private auth: Auth, private conexion: Firestore){} 
  
  
  // 3. Método signIn refactorizado
  signIn(correo:string, paas:string){
    // Usamos la función modular importada, pasándole el servicio 'auth'
    return signInWithEmailAndPassword(this.auth, correo, paas);
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
        //  Lanzar un error con un código específico si hay pedidos
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
        //  Lanza el error capturado para que sea manejado por el componente
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





//-------------------MODULO PRODUCTO----------------------------------------------------

async guardarProducto(data: any): Promise<void> {
    try {
      // 2. Obtenemos una referencia a la colección 'usuarios'
      const productoCollection = collection(this.conexion, 'productos');
      
      // 3. Añadimos el documento. Firebase le asignará un ID automático.
      await addDoc(productoCollection, data);

      console.log('Documento añadido a Firestore con éxito.');
      
    } catch (error) {
      console.error('Error guardando los datos en Firestore:', error);
      // Lanzamos el error para que el componente lo pueda manejar y avisar al usuario
      throw new Error('Fallo al guardar los datos del usuario en la base de datos.');
    }
  }


  async obtenerProductos() {
    try {
      // 1. Obtener la referencia a la colección 'productos'
      const productosRef = collection(this.conexion, 'productos');

      // 2. Ejecutar la consulta para obtener todos los documentos
      const querySnapshot = await getDocs(productosRef);

      // 3. Mapear los documentos a un array de objetos productos
      const productos = querySnapshot.docs.map(doc => {
        return {
          id: doc.id, // Incluir el ID del documento
          ...doc.data() // Incluir todos los campos del documento
        };
      });

      console.log('Productos obtenidos:', productos);
      return { success: true, data: productos };
    } catch (error) {
      console.error('Error al obtener productos:', error);
      return { success: false, error };
    }
  }



  async obtenerProductoPorId(id: string): Promise<any> {
    const docRef = doc(this.conexion, 'productos', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }; // Devuelve los datos con el ID
    } else {
        // Lanza un error si no encuentra el cliente
        throw new Error('Producto  no encontrado.');
    }
}


async editarProducto(id: string, datosActualizados: any): Promise<void> {
    try {
        const clienteRef = doc(this.conexion, 'productos', id);

        // Realiza la actualización del documento en Firestore
        await updateDoc(clienteRef, datosActualizados);

        // Si la promesa se resuelve, la función sale exitosamente (no devuelve nada)
        
    } catch (error) {
        //  Lanza el error capturado para que sea manejado por el componente
        console.error('Error en el servicio al actualizar producto:', error);
        
        // Podemos lanzar un nuevo error más descriptivo o el original
        throw new Error('Fallo la actualización en la base de datos. Intente de nuevo.');
    }
}



async eliminarProducto(productoId: string) {
    // 1. Verificar Referencias (Mantenemos la lógica de bloqueo)
    const pedidosRef = collection(this.conexion, 'pedidos');
    const q = query(pedidosRef, where('productoId', '==', productoId));
    const pedidosSnapshot = await getDocs(q);

    if (!pedidosSnapshot.empty) {
        //  Lanzar un error con un código específico si hay pedidos
        const error = new Error('Restricción de datos: El producto tiene pedidos asociados.');
        (error as any).codigo = 'HAS_ORDERS'; // Añadir una propiedad personalizada al error
        throw error;
    }

    // 2. Eliminar
    const docRef = doc(this.conexion, 'productos', productoId);
    await deleteDoc(docRef);

    // Si llega aquí, la eliminación fue exitosa (no necesitamos devolver nada)
}



// MODULO DE PEDIDOS

async guardarPedidos(data:any): Promise<void>{

  try{
   const pedidosColecion=collection(this.conexion,'pedidos');
   await addDoc(pedidosColecion,data);
   console.log( "Registro de pedido guardao correctamente en firestore");

  }catch(error){

console.error("Error al registrar el pedido por ",error);
throw new Error("Fallo al guardar los datos del pedido en firestore");
  }
}

async obtenerPedidos(){

  try{

const pedidoRef=collection(this.conexion,'pedidos');
const copiaConsulta=await getDocs(pedidoRef);
const pedidos=copiaConsulta.docs.map(doc=>{

  return { 
    id:doc.id,
    ...doc.data()
  };
});
  console.log('Pedidos obtenidos : ',pedidos);
  return {success:true, data:pedidos};

  }catch(error){

   console.error('Error al obtener pedidos, no se pudo por ',error);
   return {success:false, error};

  }
}


async descontarStock(productoId: string, tallasAVender: any) {
  try {
    // 1. Crear la referencia al documento usando la función 'doc'
    // Sintaxis: doc(instanciaFirestore, nombreColeccion, idDocumento)
    const productoRef = doc(this.conexion, 'productos', productoId);

    // 2. Ejecutar la transacción
    await runTransaction(this.conexion, async (transaction) => {
      
      // A) Leer el documento DENTRO de la transacción
      const documento = await transaction.get(productoRef);

      if (!documento.exists()) {
        throw "El producto no existe";
      }

      // B) Obtener la data
      const data = documento.data() as any;
      const stockActual = data.stock_por_talla || {}; // Protección por si es null

      // C) Calcular el nuevo stock (Tu lógica original)
      const nuevoStock = {
        S: (stockActual.S || 0) - (tallasAVender.S || 0),
        M: (stockActual.M || 0) - (tallasAVender.M || 0),
        L: (stockActual.L || 0) - (tallasAVender.L || 0)
      };

      // D) Validar negativos
      if (nuevoStock.S < 0 || nuevoStock.M < 0 || nuevoStock.L < 0) {
        throw "No hay stock suficiente para realizar esta venta";
      }

      // E) Escribir el cambio (UPDATE)
      // En modular, transaction.update recibe la referencia y el objeto a cambiar
      transaction.update(productoRef, { stock_por_talla: nuevoStock });
    });

    return { success: true };

  } catch (error) {
    console.error("Error en transacción:", error);
    return { success: false, error: error };
  }
}



  
}
