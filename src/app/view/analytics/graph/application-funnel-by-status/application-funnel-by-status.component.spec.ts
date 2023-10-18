import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationFunnelByStatusComponent } from './application-funnel-by-status.component';

describe('ApplicationFunnelByStatusComponent', () => {
  let component: ApplicationFunnelByStatusComponent;
  let fixture: ComponentFixture<ApplicationFunnelByStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationFunnelByStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationFunnelByStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
