import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferLeadComponent } from './refer-lead.component';

describe('ReferLeadComponent', () => {
  let component: ReferLeadComponent;
  let fixture: ComponentFixture<ReferLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferLeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
