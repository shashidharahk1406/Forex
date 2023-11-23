import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappTemplateDuplicateComponent } from './whatsapp-template-duplicate.component';

describe('WhatsappTemplateDuplicateComponent', () => {
  let component: WhatsappTemplateDuplicateComponent;
  let fixture: ComponentFixture<WhatsappTemplateDuplicateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappTemplateDuplicateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappTemplateDuplicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
