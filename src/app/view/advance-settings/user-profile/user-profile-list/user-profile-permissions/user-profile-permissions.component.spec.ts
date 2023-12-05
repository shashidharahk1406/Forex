import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilePermissionsComponent } from './user-profile-permissions.component';

describe('UserProfilePermissionsComponent', () => {
  let component: UserProfilePermissionsComponent;
  let fixture: ComponentFixture<UserProfilePermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfilePermissionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfilePermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
