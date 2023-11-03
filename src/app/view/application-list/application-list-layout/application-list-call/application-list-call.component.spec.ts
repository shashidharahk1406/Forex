import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationListCallComponent } from './application-list-call.component';

describe('ApplicationListCallComponent', () => {
  let component: ApplicationListCallComponent;
  let fixture: ComponentFixture<ApplicationListCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationListCallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationListCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
