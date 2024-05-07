import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCardContentComponent } from './customer-card-content.component';

describe('CustomerCardContentComponent', () => {
  let component: CustomerCardContentComponent;
  let fixture: ComponentFixture<CustomerCardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCardContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
