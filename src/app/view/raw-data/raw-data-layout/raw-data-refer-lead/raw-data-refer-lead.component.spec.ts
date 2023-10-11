import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawDataReferLeadComponent } from './raw-data-refer-lead.component';

describe('RawDataReferLeadComponent', () => {
  let component: RawDataReferLeadComponent;
  let fixture: ComponentFixture<RawDataReferLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawDataReferLeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawDataReferLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
