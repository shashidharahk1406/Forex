import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdvanceSettingsPermissionsComponent } from './edit-advance-settings-permissions.component';

describe('EditAdvanceSettingsPermissionsComponent', () => {
  let component: EditAdvanceSettingsPermissionsComponent;
  let fixture: ComponentFixture<EditAdvanceSettingsPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdvanceSettingsPermissionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdvanceSettingsPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
