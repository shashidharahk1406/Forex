import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalVerifiedEnquiriesMailComponent } from './total-verified-enquiries-mail.component';

describe('TotalVerifiedEnquiriesMailComponent', () => {
  let component: TotalVerifiedEnquiriesMailComponent;
  let fixture: ComponentFixture<TotalVerifiedEnquiriesMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalVerifiedEnquiriesMailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalVerifiedEnquiriesMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
