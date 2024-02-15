import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferFollowupComponent } from './refer-followup.component';

describe('ReferFollowupComponent', () => {
  let component: ReferFollowupComponent;
  let fixture: ComponentFixture<ReferFollowupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferFollowupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferFollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
