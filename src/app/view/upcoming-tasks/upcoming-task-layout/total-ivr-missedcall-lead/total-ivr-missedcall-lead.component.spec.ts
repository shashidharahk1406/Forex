import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalIVRMissedcallLeadComponent } from './total-ivr-missedcall-lead.component';

describe('TotalIVRMissedcallLeadComponent', () => {
  let component: TotalIVRMissedcallLeadComponent;
  let fixture: ComponentFixture<TotalIVRMissedcallLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalIVRMissedcallLeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalIVRMissedcallLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
