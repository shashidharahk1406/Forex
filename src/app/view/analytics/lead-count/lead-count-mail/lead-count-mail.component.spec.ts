import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCountMailComponent } from './lead-count-mail.component';

describe('LeadCountMailComponent', () => {
  let component: LeadCountMailComponent;
  let fixture: ComponentFixture<LeadCountMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadCountMailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadCountMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
