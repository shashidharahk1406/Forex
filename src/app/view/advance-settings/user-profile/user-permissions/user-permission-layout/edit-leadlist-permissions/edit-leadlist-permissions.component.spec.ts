import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeadlistPermissionsComponent } from './edit-leadlist-permissions.component';

describe('EditLeadlistPermissionsComponent', () => {
  let component: EditLeadlistPermissionsComponent;
  let fixture: ComponentFixture<EditLeadlistPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLeadlistPermissionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLeadlistPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
