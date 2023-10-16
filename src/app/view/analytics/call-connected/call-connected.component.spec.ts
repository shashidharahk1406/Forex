import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallConnectedComponent } from './call-connected.component';

describe('CallConnectedComponent', () => {
  let component: CallConnectedComponent;
  let fixture: ComponentFixture<CallConnectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallConnectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
