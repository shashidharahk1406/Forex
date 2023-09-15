import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCountComponent } from './lead-count.component';

describe('LeadCountComponent', () => {
  let component: LeadCountComponent;
  let fixture: ComponentFixture<LeadCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
