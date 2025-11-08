import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarPedidoPage } from './registrar-pedido.page';

describe('RegistrarPedidoPage', () => {
  let component: RegistrarPedidoPage;
  let fixture: ComponentFixture<RegistrarPedidoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
