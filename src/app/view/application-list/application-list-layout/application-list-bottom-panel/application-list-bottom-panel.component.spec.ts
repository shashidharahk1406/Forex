import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationListBottomPanelComponent } from './application-list-bottom-panel.component';

describe('ApplicationListBottomPanelComponent', () => {
  let component: ApplicationListBottomPanelComponent;
  let fixture: ComponentFixture<ApplicationListBottomPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationListBottomPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationListBottomPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
