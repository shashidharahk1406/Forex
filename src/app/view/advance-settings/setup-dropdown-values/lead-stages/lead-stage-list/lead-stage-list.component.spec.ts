import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadStageListComponent } from './lead-stage-list.component';

describe('LeadStageListComponent', () => {
  let component: LeadStageListComponent;
  let fixture: ComponentFixture<LeadStageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadStageListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadStageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
