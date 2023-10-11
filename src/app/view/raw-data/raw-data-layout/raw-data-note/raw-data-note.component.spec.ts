import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawDataNoteComponent } from './raw-data-note.component';

describe('RawDataNoteComponent', () => {
  let component: RawDataNoteComponent;
  let fixture: ComponentFixture<RawDataNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawDataNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawDataNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
