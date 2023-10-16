import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallConnectedTableComponent } from './call-connected-table.component';

describe('CallConnectedTableComponent', () => {
  let component: CallConnectedTableComponent;
  let fixture: ComponentFixture<CallConnectedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallConnectedTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallConnectedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
