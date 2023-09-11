import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserProfileListComponent } from './edit-user-profile-list.component';

describe('EditUserProfileListComponent', () => {
  let component: EditUserProfileListComponent;
  let fixture: ComponentFixture<EditUserProfileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserProfileListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
