import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EidtDocProcessComponent } from './eidt-doc-process.component';

describe('EidtDocProcessComponent', () => {
  let component: EidtDocProcessComponent;
  let fixture: ComponentFixture<EidtDocProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EidtDocProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EidtDocProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
