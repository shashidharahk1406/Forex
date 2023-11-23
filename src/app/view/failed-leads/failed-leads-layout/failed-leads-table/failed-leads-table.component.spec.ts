import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedLeadsTableComponent } from './failed-leads-table.component';

describe('FailedLeadsTableComponent', () => {
  let component: FailedLeadsTableComponent;
  let fixture: ComponentFixture<FailedLeadsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailedLeadsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailedLeadsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
