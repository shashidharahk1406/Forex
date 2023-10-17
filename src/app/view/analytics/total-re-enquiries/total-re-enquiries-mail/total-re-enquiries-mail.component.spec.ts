import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalReEnquiriesMailComponent } from './total-re-enquiries-mail.component';

describe('TotalReEnquiriesMailComponent', () => {
  let component: TotalReEnquiriesMailComponent;
  let fixture: ComponentFixture<TotalReEnquiriesMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalReEnquiriesMailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalReEnquiriesMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
