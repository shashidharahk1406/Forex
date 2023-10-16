import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredApplicationWhatsappComponent } from './registered-application-whatsapp.component';

describe('RegisteredApplicationWhatsappComponent', () => {
  let component: RegisteredApplicationWhatsappComponent;
  let fixture: ComponentFixture<RegisteredApplicationWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredApplicationWhatsappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredApplicationWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
