import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPaidApplicationsMailComponent } from './total-paid-applications-mail.component';

describe('TotalPaidApplicationsMailComponent', () => {
  let component: TotalPaidApplicationsMailComponent;
  let fixture: ComponentFixture<TotalPaidApplicationsMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalPaidApplicationsMailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalPaidApplicationsMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
