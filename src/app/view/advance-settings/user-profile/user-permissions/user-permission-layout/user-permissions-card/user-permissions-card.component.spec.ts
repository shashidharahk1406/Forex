import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPermissionsCardComponent } from './user-permissions-card.component';

describe('UserPermissionsCardComponent', () => {
  let component: UserPermissionsCardComponent;
  let fixture: ComponentFixture<UserPermissionsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPermissionsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPermissionsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
