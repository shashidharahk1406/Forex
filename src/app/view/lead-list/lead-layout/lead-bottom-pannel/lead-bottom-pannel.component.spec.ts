import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadBottomPannelComponent } from './lead-bottom-pannel.component';

describe('LeadBottomPannelComponent', () => {
  let component: LeadBottomPannelComponent;
  let fixture: ComponentFixture<LeadBottomPannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadBottomPannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadBottomPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
