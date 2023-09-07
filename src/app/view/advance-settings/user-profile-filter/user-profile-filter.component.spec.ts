import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileFilterComponent } from './user-profile-filter.component';

describe('UserProfileFilterComponent', () => {
  let component: UserProfileFilterComponent;
  let fixture: ComponentFixture<UserProfileFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
