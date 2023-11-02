import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationListCardContentComponent } from './application-list-card-content.component';

describe('ApplicationListCardContentComponent', () => {
  let component: ApplicationListCardContentComponent;
  let fixture: ComponentFixture<ApplicationListCardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationListCardContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationListCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
