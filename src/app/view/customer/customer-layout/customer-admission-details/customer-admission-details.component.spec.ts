import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAdmissionDetailsComponent } from './customer-admission-details.component';

describe('CustomerAdmissionDetailsComponent', () => {
  let component: CustomerAdmissionDetailsComponent;
  let fixture: ComponentFixture<CustomerAdmissionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAdmissionDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAdmissionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
