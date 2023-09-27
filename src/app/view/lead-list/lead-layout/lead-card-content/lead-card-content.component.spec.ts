import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCardContentComponent } from './lead-card-content.component';

describe('LeadCardContentComponent', () => {
  let component: LeadCardContentComponent;
  let fixture: ComponentFixture<LeadCardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadCardContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
