import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarClientePage } from './listar-cliente.page';

describe('ListarClientePage', () => {
  let component: ListarClientePage;
  let fixture: ComponentFixture<ListarClientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
