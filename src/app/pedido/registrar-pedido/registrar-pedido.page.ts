import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Alertas } from 'src/app/servicio/alertas';
import { Basedatos } from 'src/app/servicio/basedatos';
import { itemPedido, pedido, tallas } from 'src/app/interfaces/pedido';
import { pedidoinicio } from 'src/app/objetos/pedidoinicial';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-registrar-pedido',
  templateUrl: './registrar-pedido.page.html',
  styleUrls: ['./registrar-pedido.page.scss'],
  standalone: false
})
export class RegistrarPedidoPage implements OnInit {

  listaclientes: any[] = [];
  listaproductos: any[] = [];
  productosseleccionados: any[] = [];
  listaIDprodus:string []=[];
  //productoSeleccionado: Producto | null = null;
  cantidad: number = 1;
  productoTemporal: any=null;
  modalAbierto:boolean=false;
  seleccionTemporal:any={ S:0,M:0,L:0};
 
  miFormulario:FormGroup;






  constructor(private router:Router,
    private base:Basedatos,
    private alerta:Alertas,
    private fb: FormBuilder) { 

     this.miFormulario=this.fb.group({

      cliente:[null,Validators.required],
      metodopago:['',Validators.required],
      notas: ['']
     });


    }

  ngOnInit() {
    //this.cargarDatos();
  }

  ionViewWillEnter() {
  this.cargarDatos(); // Se ejecuta cada vez que entras a la vista
}

  async cargarDatos(){

  const respuesta=await this.base.obtenerClientes();


  if(respuesta.success){
   this.listaclientes=respuesta.data;
   console.log('clientes cargados en la page de registrar pedidos ',this.listaclientes);
  }else{

   console.error('No se pudieron cargar los clientes:', respuesta.error);
  }

  const resproductos=await this.base.obtenerProductos();
  if(resproductos.success){
  this.listaproductos=resproductos.data;
  console.log('productos cargados en la page de registrar pedidos ',this.listaproductos);
  }else{

   console.error('No se pudieron cargar los productos:', resproductos.error);

  }
  
  }



  abrirModal(producto:any){

    this.productoTemporal=producto;
    this.seleccionTemporal = { S: 0, M: 0, L: 0 };
    this.modalAbierto=true;


     //this.alerta.mostrarDialogo("hola funciona esto");


  }

  cerrarModal(){

    this.modalAbierto=false;
    this.productoTemporal=null;

  }

  seleccionarProducto(){
      


  }

  borrarItem(index: number) {
    this.productosseleccionados.splice(index, 1);
  }


  agregarCarrito(){

  const cants=this.seleccionTemporal.S || 0;
  const cantm=this.seleccionTemporal.M || 0; 
  const cantl=this.seleccionTemporal.L || 0;
  const totalcantidad=cants+cantm+cantl;

 if(cants<0 || cantm<0 || cantl<0){

    this.alerta.mostrarMensaje("No ingrese datos negativos");
    return;
  }

  const stockReal = this.productoTemporal.stock_por_talla;

  if (cants > (stockReal.S || 0)) {
    this.alerta.mostrarMensaje(`Solo quedan ${stockReal.S} unidades en Talla S.`);
    return;
  }
  // Validamos M
  if (cantm > (stockReal.M || 0)) {
    this.alerta.mostrarMensaje(`Solo quedan ${stockReal.M} unidades en Talla M.`);
    return;
  }
  // Validamos L
  if (cantl > (stockReal.L || 0)) {
    this.alerta.mostrarMensaje(`Solo quedan ${stockReal.L} unidades en Talla L.`);
    return;
  }


  const tallasElegidas:tallas={
     S:cants,
     M:cantm,
     L:cantl
  };

  if(totalcantidad===0){

    this.alerta.mostrarMensaje("Elegir al menos una talla");
    return;
  }

  //calcular subtotal
  const subtotale=totalcantidad*this.productoTemporal.precio;

  const nuevoItem:itemPedido={

    productoid:this.productoTemporal.id,
    nombreproducto:this.productoTemporal.nombre,
    tallaselegidas:tallasElegidas,
    cantidad:totalcantidad,
    preciounitario:this.productoTemporal.precio,
    subtotal:subtotale
  };
 this.productosseleccionados.push(nuevoItem);
 this.cerrarModal();

  }

  soloNumeros(event: any) {
  const pattern = /[0-9]/; // Solo permitimos dígitos del 0 al 9
  const inputChar = String.fromCharCode(event.charCode);

  // Si el caracter NO es un número, cancelamos el evento
  if (!pattern.test(inputChar)) {
    event.preventDefault();
  }
}

esProductoSeleccionado(productoId: string): boolean {
  // .some() recorre el array y devuelve true si encuentra al menos uno que cumpla la condición
  return this.productosseleccionados.some(item => item.productoid === productoId);
}


 get totalGlobal():number{

  return this.productosseleccionados.reduce((total,item)=>total+item.subtotal,0);
 }

 async registrarPedidoFinal(){

 if(this.miFormulario.invalid){

this.miFormulario.markAllAsTouched();
this.alerta.mostrarMensaje("Falta seleccionar cliente o metodo de pago");
return;
 }

 if(this.productosseleccionados.length===0){
  this.alerta.mostrarMensaje('El carrito esta vacío.');
  return;
 }

 /*const clienteElegido = this.miFormulario.get('cliente')?.value;
 if (!clienteElegido) {
     this.alerta.mostrarMensaje("Falta cliente");
     return;
  }*/

 this.listaIDprodus=this.productosseleccionados.map(producto=>producto.productoid) ; 
 console.log("ESTOS SON LOS IDS a guardar en pedido",this.listaIDprodus) ; 

const{cliente,metodopago,notas}=this.miFormulario.value;
console.log(cliente);

const nuevoPedido: pedido = {
      ...pedidoinicio,

      cliente: {
          // Aquí mapeamos los datos del "clienteElegido"
          clienteid: cliente.id, 
          nombre: cliente.nombre,
          direccion: cliente.direccion || ''
      },

      item: this.productosseleccionados,
      // ... resto de datos
      total: this.totalGlobal,
      metodopago: metodopago,
      fechaorigen: new Date(),
      notas:notas || '',
      arregloidprodu:this.listaIDprodus,
  };

try {
      // D) DESCONTAR STOCK 
      for (const itemVenta of this.productosseleccionados) {
         const resultado = await this.base.descontarStock(itemVenta.productoid, itemVenta.tallaselegidas);
         if (!resultado.success) {
            this.alerta.mostrarMensaje(`Stock insuficiente en: ${itemVenta.nombreproducto}`);
            return; // ¡Importante! Paramos todo si falla uno
         }
      }

      // E) GUARDAR PEDIDO
      await this.base.guardarPedidos(nuevoPedido);
      
      this.alerta.mostrarMensaje("Pedido registrado correctamente");
      
      // LIMPIEZA TOTAL
      this.miFormulario.reset(); // Limpia cliente , pago y notas
      this.productosseleccionados = []; // Limpia carrito
      //this.router.navigate(['/menu']);

    } catch (error) {
      console.error(error);
      this.alerta.mostrarMensaje("Error en el servidor.");
    
  }


 }


 async cancelarcarro(){
      let confirmar= await this.alerta.dialogoConfirmacion("Seguro que desea cancelar, se perdera todo lo registrado en el pedido actual y tendra que volver a escoger de nuevo")
      if(confirmar){
        this.miFormulario.reset(); // Limpia cliente , pago y notas
        this.productosseleccionados = []; // Limpia carrito

      }
      


 }




  volverMenu(){

  const activo = document.activeElement as HTMLElement | null;
    if (activo) {
      activo.blur();
    }

    this.router.navigate(['/menu']);



  }

}
