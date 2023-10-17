import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissedFollowupWhatsappComponent } from './missed-followup-whatsapp.component';

describe('MissedFollowupWhatsappComponent', () => {
  let component: MissedFollowupWhatsappComponent;
  let fixture: ComponentFixture<MissedFollowupWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissedFollowupWhatsappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissedFollowupWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
