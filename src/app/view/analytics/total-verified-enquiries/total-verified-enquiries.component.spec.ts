import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalVerifiedEnquiriesComponent } from './total-verified-enquiries.component';

describe('TotalVerifiedEnquiriesComponent', () => {
  let component: TotalVerifiedEnquiriesComponent;
  let fixture: ComponentFixture<TotalVerifiedEnquiriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalVerifiedEnquiriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalVerifiedEnquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
