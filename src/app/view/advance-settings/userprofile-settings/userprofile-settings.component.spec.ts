import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofileSettingsComponent } from './userprofile-settings.component';

describe('UserprofileSettingsComponent', () => {
  let component: UserprofileSettingsComponent;
  let fixture: ComponentFixture<UserprofileSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserprofileSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserprofileSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
