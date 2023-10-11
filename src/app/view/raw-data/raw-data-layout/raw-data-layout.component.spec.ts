import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawDataLayoutComponent } from './raw-data-layout.component';

describe('RawDataLayoutComponent', () => {
  let component: RawDataLayoutComponent;
  let fixture: ComponentFixture<RawDataLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawDataLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawDataLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
