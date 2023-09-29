import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadcardMoreComponent } from './leadcard-more.component';

describe('LeadcardMoreComponent', () => {
  let component: LeadcardMoreComponent;
  let fixture: ComponentFixture<LeadcardMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadcardMoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadcardMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
