import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadEmailComponent } from './lead-email.component';

describe('LeadEmailComponent', () => {
  let component: LeadEmailComponent;
  let fixture: ComponentFixture<LeadEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
