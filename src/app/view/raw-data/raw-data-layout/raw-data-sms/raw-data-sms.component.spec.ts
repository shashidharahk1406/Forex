import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawDataSmsComponent } from './raw-data-sms.component';

describe('RawDataSmsComponent', () => {
  let component: RawDataSmsComponent;
  let fixture: ComponentFixture<RawDataSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawDataSmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawDataSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
