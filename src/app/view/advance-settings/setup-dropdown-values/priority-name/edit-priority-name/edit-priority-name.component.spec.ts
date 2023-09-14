import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPriorityNameComponent } from './edit-priority-name.component';

describe('EditPriorityNameComponent', () => {
  let component: EditPriorityNameComponent;
  let fixture: ComponentFixture<EditPriorityNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPriorityNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPriorityNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
