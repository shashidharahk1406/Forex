import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPermissionLayoutComponent } from './user-permission-layout.component';

describe('UserPermissionLayoutComponent', () => {
  let component: UserPermissionLayoutComponent;
  let fixture: ComponentFixture<UserPermissionLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPermissionLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPermissionLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
