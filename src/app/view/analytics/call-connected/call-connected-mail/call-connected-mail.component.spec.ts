import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallConnectedMailComponent } from './call-connected-mail.component';

describe('CallConnectedMailComponent', () => {
  let component: CallConnectedMailComponent;
  let fixture: ComponentFixture<CallConnectedMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallConnectedMailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallConnectedMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
