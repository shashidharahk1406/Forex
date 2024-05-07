import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEditDocProcessComponent } from './customer-edit-doc-process.component';

describe('CustomerEditDocProcessComponent', () => {
  let component: CustomerEditDocProcessComponent;
  let fixture: ComponentFixture<CustomerEditDocProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerEditDocProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerEditDocProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
