import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPaymentProofComponent } from './customer-payment-proof.component';

describe('CustomerPaymentProofComponent', () => {
  let component: CustomerPaymentProofComponent;
  let fixture: ComponentFixture<CustomerPaymentProofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPaymentProofComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPaymentProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
