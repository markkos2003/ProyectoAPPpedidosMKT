import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.page.html',
  styleUrls: ['./registrar-cliente.page.scss'],
  standalone: false,
})
export class RegistrarClientePage implements OnInit {



  clienteForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  registrarCliente(){}

}
