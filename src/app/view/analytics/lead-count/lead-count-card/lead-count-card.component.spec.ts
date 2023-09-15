import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCountCardComponent } from './lead-count-card.component';

describe('LeadCountCardComponent', () => {
  let component: LeadCountCardComponent;
  let fixture: ComponentFixture<LeadCountCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadCountCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadCountCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
