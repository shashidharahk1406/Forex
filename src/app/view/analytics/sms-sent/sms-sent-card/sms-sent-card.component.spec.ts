import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsSentCardComponent } from './sms-sent-card.component';

describe('SmsSentCardComponent', () => {
  let component: SmsSentCardComponent;
  let fixture: ComponentFixture<SmsSentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsSentCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsSentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
