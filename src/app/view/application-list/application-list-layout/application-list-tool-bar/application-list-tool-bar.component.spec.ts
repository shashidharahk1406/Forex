import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationListToolBarComponent } from './application-list-tool-bar.component';

describe('ApplicationListToolBarComponent', () => {
  let component: ApplicationListToolBarComponent;
  let fixture: ComponentFixture<ApplicationListToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationListToolBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationListToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
