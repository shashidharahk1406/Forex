import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationListCardComponent } from './application-list-card.component';

describe('ApplicationListCardComponent', () => {
  let component: ApplicationListCardComponent;
  let fixture: ComponentFixture<ApplicationListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationListCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
