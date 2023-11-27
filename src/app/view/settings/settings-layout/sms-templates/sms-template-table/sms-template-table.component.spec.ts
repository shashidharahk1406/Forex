import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsTemplateTableComponent } from './sms-template-table.component';

describe('SmsTemplateTableComponent', () => {
  let component: SmsTemplateTableComponent;
  let fixture: ComponentFixture<SmsTemplateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsTemplateTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsTemplateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
