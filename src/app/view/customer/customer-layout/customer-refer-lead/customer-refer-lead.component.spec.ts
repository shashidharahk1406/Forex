import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReferLeadComponent } from './customer-refer-lead.component';

describe('CustomerReferLeadComponent', () => {
  let component: CustomerReferLeadComponent;
  let fixture: ComponentFixture<CustomerReferLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerReferLeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerReferLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
