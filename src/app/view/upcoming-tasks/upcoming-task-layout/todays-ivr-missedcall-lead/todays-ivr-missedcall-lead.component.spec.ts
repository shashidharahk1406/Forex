import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysIVRMissedcallLeadComponent } from './todays-ivr-missedcall-lead.component';

describe('TodaysIVRMissedcallLeadComponent', () => {
  let component: TodaysIVRMissedcallLeadComponent;
  let fixture: ComponentFixture<TodaysIVRMissedcallLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysIVRMissedcallLeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysIVRMissedcallLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
