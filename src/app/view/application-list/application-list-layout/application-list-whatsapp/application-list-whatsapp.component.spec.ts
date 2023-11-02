import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationListWhatsappComponent } from './application-list-whatsapp.component';

describe('ApplicationListWhatsappComponent', () => {
  let component: ApplicationListWhatsappComponent;
  let fixture: ComponentFixture<ApplicationListWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationListWhatsappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationListWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
