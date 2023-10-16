import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsSentComponent } from './sms-sent.component';

describe('SmsSentComponent', () => {
  let component: SmsSentComponent;
  let fixture: ComponentFixture<SmsSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsSentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
