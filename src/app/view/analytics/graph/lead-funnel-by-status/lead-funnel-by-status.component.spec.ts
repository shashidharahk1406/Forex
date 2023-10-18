import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadFunnelByStatusComponent } from './lead-funnel-by-status.component';

describe('LeadFunnelByStatusComponent', () => {
  let component: LeadFunnelByStatusComponent;
  let fixture: ComponentFixture<LeadFunnelByStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadFunnelByStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadFunnelByStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
