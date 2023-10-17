import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalVerifiedTableComponent } from './total-verified-table.component';

describe('TotalVerifiedTableComponent', () => {
  let component: TotalVerifiedTableComponent;
  let fixture: ComponentFixture<TotalVerifiedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalVerifiedTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalVerifiedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
