import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappTemplateTableComponent } from './whatsapp-template-table.component';

describe('WhatsappTemplateTableComponent', () => {
  let component: WhatsappTemplateTableComponent;
  let fixture: ComponentFixture<WhatsappTemplateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappTemplateTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappTemplateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
