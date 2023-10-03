import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadViewAllComponent } from './lead-view-all.component';

describe('LeadViewAllComponent', () => {
  let component: LeadViewAllComponent;
  let fixture: ComponentFixture<LeadViewAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadViewAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
