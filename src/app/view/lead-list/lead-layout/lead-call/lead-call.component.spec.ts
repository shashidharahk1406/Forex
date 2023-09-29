import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCallComponent } from './lead-call.component';

describe('LeadCallComponent', () => {
  let component: LeadCallComponent;
  let fixture: ComponentFixture<LeadCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadCallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
