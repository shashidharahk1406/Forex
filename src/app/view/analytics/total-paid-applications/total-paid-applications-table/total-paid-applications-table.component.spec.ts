import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPaidApplicationsTableComponent } from './total-paid-applications-table.component';

describe('TotalPaidApplicationsTableComponent', () => {
  let component: TotalPaidApplicationsTableComponent;
  let fixture: ComponentFixture<TotalPaidApplicationsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalPaidApplicationsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalPaidApplicationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
