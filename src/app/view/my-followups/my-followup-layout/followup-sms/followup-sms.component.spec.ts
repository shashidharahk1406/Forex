import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupSmsComponent } from './followup-sms.component';

describe('FollowupSmsComponent', () => {
  let component: FollowupSmsComponent;
  let fixture: ComponentFixture<FollowupSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowupSmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowupSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
