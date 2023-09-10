import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappFilterComponent } from './whatsapp-filter.component';

describe('WhatsappFilterComponent', () => {
  let component: WhatsappFilterComponent;
  let fixture: ComponentFixture<WhatsappFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
