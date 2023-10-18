import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCountBySourceComponent } from './lead-count-by-source.component';

describe('LeadCountBySourceComponent', () => {
  let component: LeadCountBySourceComponent;
  let fixture: ComponentFixture<LeadCountBySourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadCountBySourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadCountBySourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
