import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupWhatsappchatComponent } from './followup-whatsappchat.component';

describe('FollowupWhatsappchatComponent', () => {
  let component: FollowupWhatsappchatComponent;
  let fixture: ComponentFixture<FollowupWhatsappchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowupWhatsappchatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowupWhatsappchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
