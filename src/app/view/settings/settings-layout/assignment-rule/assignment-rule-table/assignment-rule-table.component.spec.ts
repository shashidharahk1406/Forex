import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentRuleTableComponent } from './assignment-rule-table.component';

describe('AssignmentRuleTableComponent', () => {
  let component: AssignmentRuleTableComponent;
  let fixture: ComponentFixture<AssignmentRuleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentRuleTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentRuleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
