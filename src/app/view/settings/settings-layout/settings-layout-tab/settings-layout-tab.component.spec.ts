import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsLayoutTabComponent } from './settings-layout-tab.component';

describe('SettingsLayoutTabComponent', () => {
  let component: SettingsLayoutTabComponent;
  let fixture: ComponentFixture<SettingsLayoutTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsLayoutTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsLayoutTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
