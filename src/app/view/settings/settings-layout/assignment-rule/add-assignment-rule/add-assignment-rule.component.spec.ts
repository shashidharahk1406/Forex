import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssignmentRuleComponent } from './add-assignment-rule.component';

describe('AddAssignmentRuleComponent', () => {
  let component: AddAssignmentRuleComponent;
  let fixture: ComponentFixture<AddAssignmentRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAssignmentRuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAssignmentRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
