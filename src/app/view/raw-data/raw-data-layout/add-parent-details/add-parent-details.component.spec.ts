import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParentDetailsComponent } from './add-parent-details.component';

describe('AddParentDetailsComponent', () => {
  let component: AddParentDetailsComponent;
  let fixture: ComponentFixture<AddParentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddParentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
