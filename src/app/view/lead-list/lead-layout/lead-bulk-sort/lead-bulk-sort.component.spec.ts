import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadBulkSortComponent } from './lead-bulk-sort.component';

describe('LeadBulkSortComponent', () => {
  let component: LeadBulkSortComponent;
  let fixture: ComponentFixture<LeadBulkSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadBulkSortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadBulkSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
