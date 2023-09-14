import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelOfProgramComponent } from './level-of-program.component';

describe('LevelOfProgramComponent', () => {
  let component: LevelOfProgramComponent;
  let fixture: ComponentFixture<LevelOfProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelOfProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelOfProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
