import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappViewTemplateComponent } from './whatsapp-view-template.component';

describe('WhatsappViewTemplateComponent', () => {
  let component: WhatsappViewTemplateComponent;
  let fixture: ComponentFixture<WhatsappViewTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappViewTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappViewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
