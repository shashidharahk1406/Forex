import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBulkSortComponent } from './customer-bulk-sort.component';

describe('CustomerBulkSortComponent', () => {
  let component: CustomerBulkSortComponent;
  let fixture: ComponentFixture<CustomerBulkSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerBulkSortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerBulkSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
