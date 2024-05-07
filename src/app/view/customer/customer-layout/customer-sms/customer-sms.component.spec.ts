import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSmsComponent } from './customer-sms.component';

describe('CustomerSmsComponent', () => {
  let component: CustomerSmsComponent;
  let fixture: ComponentFixture<CustomerSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
