import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceSettingsControlComponent } from './advance-settings-control.component';

describe('AdvanceSettingsControlComponent', () => {
  let component: AdvanceSettingsControlComponent;
  let fixture: ComponentFixture<AdvanceSettingsControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvanceSettingsControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvanceSettingsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
