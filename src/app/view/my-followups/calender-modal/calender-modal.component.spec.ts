import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderModalComponent } from './calender-modal.component';

describe('CalenderModalComponent', () => {
  let component: CalenderModalComponent;
  let fixture: ComponentFixture<CalenderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalenderModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalenderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
