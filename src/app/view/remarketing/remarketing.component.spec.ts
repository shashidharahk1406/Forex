import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarketingComponent } from './remarketing.component';

describe('RemarketingComponent', () => {
  let component: RemarketingComponent;
  let fixture: ComponentFixture<RemarketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemarketingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
