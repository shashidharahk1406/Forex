import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadNoteComponent } from './lead-note.component';

describe('LeadNoteComponent', () => {
  let component: LeadNoteComponent;
  let fixture: ComponentFixture<LeadNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
