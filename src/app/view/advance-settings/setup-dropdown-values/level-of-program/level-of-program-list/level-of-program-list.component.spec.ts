import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelOfProgramListComponent } from './level-of-program-list.component';

describe('LevelOfProgramListComponent', () => {
  let component: LevelOfProgramListComponent;
  let fixture: ComponentFixture<LevelOfProgramListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelOfProgramListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelOfProgramListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
