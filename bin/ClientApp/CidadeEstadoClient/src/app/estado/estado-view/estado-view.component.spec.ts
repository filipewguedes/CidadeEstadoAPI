import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoViewComponent } from './estado-view.component';

describe('EstadoViewComponent', () => {
  let component: EstadoViewComponent;
  let fixture: ComponentFixture<EstadoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
