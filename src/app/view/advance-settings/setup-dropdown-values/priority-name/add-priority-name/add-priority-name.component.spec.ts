import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPriorityNameComponent } from './add-priority-name.component';

describe('AddPriorityNameComponent', () => {
  let component: AddPriorityNameComponent;
  let fixture: ComponentFixture<AddPriorityNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPriorityNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPriorityNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
