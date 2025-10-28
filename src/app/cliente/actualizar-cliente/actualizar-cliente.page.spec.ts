import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActualizarClientePage } from './actualizar-cliente.page';

describe('ActualizarClientePage', () => {
  let component: ActualizarClientePage;
  let fixture: ComponentFixture<ActualizarClientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
