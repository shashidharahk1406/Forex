import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawDataCallComponent } from './raw-data-call.component';

describe('RawDataCallComponent', () => {
  let component: RawDataCallComponent;
  let fixture: ComponentFixture<RawDataCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawDataCallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawDataCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
