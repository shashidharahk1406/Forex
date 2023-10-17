import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPaidApplicationsComponent } from './total-paid-applications.component';

describe('TotalPaidApplicationsComponent', () => {
  let component: TotalPaidApplicationsComponent;
  let fixture: ComponentFixture<TotalPaidApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalPaidApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalPaidApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
