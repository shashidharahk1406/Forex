import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPaidApplicationsCardComponent } from './total-paid-applications-card.component';

describe('TotalPaidApplicationsCardComponent', () => {
  let component: TotalPaidApplicationsCardComponent;
  let fixture: ComponentFixture<TotalPaidApplicationsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalPaidApplicationsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalPaidApplicationsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
