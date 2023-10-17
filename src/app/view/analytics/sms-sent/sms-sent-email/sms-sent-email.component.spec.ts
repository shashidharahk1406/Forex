import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsSentEmailComponent } from './sms-sent-email.component';

describe('SmsSentEmailComponent', () => {
  let component: SmsSentEmailComponent;
  let fixture: ComponentFixture<SmsSentEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsSentEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsSentEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
