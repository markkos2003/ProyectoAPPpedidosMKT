import { pedido } from "../interfaces/pedido";

export const pedidoinicio:pedido={
   id:"",
   cliente:{
    clienteid:"",
    nombre:"",
    direccion:"",

   },
   item:[],
   fechaorigen:new Date(),
   fechaentrega:null,
   total:0,
   metodopago:'',
   estado:'en proceso',
   notas:''
};