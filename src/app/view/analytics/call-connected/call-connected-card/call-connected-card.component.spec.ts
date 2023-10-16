import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallConnectedCardComponent } from './call-connected-card.component';

describe('CallConnectedCardComponent', () => {
  let component: CallConnectedCardComponent;
  let fixture: ComponentFixture<CallConnectedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallConnectedCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallConnectedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
