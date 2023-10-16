import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissedFollowupSmsComponent } from './missed-followup-sms.component';

describe('MissedFollowupSmsComponent', () => {
  let component: MissedFollowupSmsComponent;
  let fixture: ComponentFixture<MissedFollowupSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissedFollowupSmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissedFollowupSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
