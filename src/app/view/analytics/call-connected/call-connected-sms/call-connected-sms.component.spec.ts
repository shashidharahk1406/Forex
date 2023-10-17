import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallConnectedSmsComponent } from './call-connected-sms.component';

describe('CallConnectedSmsComponent', () => {
  let component: CallConnectedSmsComponent;
  let fixture: ComponentFixture<CallConnectedSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallConnectedSmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallConnectedSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
