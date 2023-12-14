import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadListControlComponent } from './lead-list-control.component';

describe('LeadListControlComponent', () => {
  let component: LeadListControlComponent;
  let fixture: ComponentFixture<LeadListControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadListControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadListControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
