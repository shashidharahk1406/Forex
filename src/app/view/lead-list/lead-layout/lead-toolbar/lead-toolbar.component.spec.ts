import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadToolbarComponent } from './lead-toolbar.component';

describe('LeadToolbarComponent', () => {
  let component: LeadToolbarComponent;
  let fixture: ComponentFixture<LeadToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
