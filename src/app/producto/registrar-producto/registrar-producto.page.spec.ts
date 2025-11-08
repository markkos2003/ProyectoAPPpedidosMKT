import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarProductoPage } from './registrar-producto.page';

describe('RegistrarProductoPage', () => {
  let component: RegistrarProductoPage;
  let fixture: ComponentFixture<RegistrarProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
