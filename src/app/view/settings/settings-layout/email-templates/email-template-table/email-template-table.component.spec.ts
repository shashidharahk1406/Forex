import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTemplateTableComponent } from './email-template-table.component';

describe('EmailTemplateTableComponent', () => {
  let component: EmailTemplateTableComponent;
  let fixture: ComponentFixture<EmailTemplateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailTemplateTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailTemplateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
