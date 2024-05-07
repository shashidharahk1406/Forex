import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDocProcessComponent } from './customer-doc-process.component';

describe('CustomerDocProcessComponent', () => {
  let component: CustomerDocProcessComponent;
  let fixture: ComponentFixture<CustomerDocProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDocProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDocProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
