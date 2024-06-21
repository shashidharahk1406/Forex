import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranferCounsellorsComponent } from './tranfer-counsellors.component';

describe('TranferCounsellorsComponent', () => {
  let component: TranferCounsellorsComponent;
  let fixture: ComponentFixture<TranferCounsellorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranferCounsellorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranferCounsellorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
