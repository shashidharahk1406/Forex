import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawDataWhatsappchatComponent } from './raw-data-whatsappchat.component';

describe('RawDataWhatsappchatComponent', () => {
  let component: RawDataWhatsappchatComponent;
  let fixture: ComponentFixture<RawDataWhatsappchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawDataWhatsappchatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawDataWhatsappchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
