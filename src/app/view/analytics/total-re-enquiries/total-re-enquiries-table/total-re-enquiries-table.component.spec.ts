import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalReEnquiriesTableComponent } from './total-re-enquiries-table.component';

describe('TotalReEnquiriesTableComponent', () => {
  let component: TotalReEnquiriesTableComponent;
  let fixture: ComponentFixture<TotalReEnquiriesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalReEnquiriesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalReEnquiriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
