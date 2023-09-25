import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadLayoutComponent } from './lead-layout.component';

describe('LeadLayoutComponent', () => {
  let component: LeadLayoutComponent;
  let fixture: ComponentFixture<LeadLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
