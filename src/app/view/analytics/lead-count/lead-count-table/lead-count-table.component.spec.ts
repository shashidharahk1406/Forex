import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCountTableComponent } from './lead-count-table.component';

describe('LeadCountTableComponent', () => {
  let component: LeadCountTableComponent;
  let fixture: ComponentFixture<LeadCountTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadCountTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadCountTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
