import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsSentTableComponent } from './sms-sent-table.component';

describe('SmsSentTableComponent', () => {
  let component: SmsSentTableComponent;
  let fixture: ComponentFixture<SmsSentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsSentTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsSentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
