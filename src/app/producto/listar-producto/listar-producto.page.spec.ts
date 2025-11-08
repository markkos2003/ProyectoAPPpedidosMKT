import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarProductoPage } from './listar-producto.page';

describe('ListarProductoPage', () => {
  let component: ListarProductoPage;
  let fixture: ComponentFixture<ListarProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
