import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsSentSmsComponent } from './sms-sent-sms.component';

describe('SmsSentSmsComponent', () => {
  let component: SmsSentSmsComponent;
  let fixture: ComponentFixture<SmsSentSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsSentSmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsSentSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
