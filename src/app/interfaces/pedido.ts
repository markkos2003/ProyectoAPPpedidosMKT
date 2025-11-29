export interface pedido{
id?:string;
cliente:datosCliente;
item:itemPedido[];
fechaorigen:Date;
fechaentrega:Date | null;
total:number;
metodopago:'efectivo'| 'tarjeta'| 'yape' | '';
estado: 'en proceso' | 'cancelado' | 'entregado';
notas?: string;

}

export interface itemPedido{
productoid:string;
nombreproducto:string;
tallaselegidas:tallas;
cantidad:number;
preciounitario:number;
subtotal:number;

}

export interface datosCliente{
clienteid:string;
nombre:string;
direccion:string;

}

export interface tallas{
    S?: number;
    M?: number;
    L?: number;

}