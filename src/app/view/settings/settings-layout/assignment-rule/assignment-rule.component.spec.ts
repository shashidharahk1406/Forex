import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentRuleComponent } from './assignment-rule.component';

describe('AssignmentRuleComponent', () => {
  let component: AssignmentRuleComponent;
  let fixture: ComponentFixture<AssignmentRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentRuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
