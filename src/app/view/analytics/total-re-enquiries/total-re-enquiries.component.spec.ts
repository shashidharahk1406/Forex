import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalReEnquiriesComponent } from './total-re-enquiries.component';

describe('TotalReEnquiriesComponent', () => {
  let component: TotalReEnquiriesComponent;
  let fixture: ComponentFixture<TotalReEnquiriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalReEnquiriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalReEnquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
