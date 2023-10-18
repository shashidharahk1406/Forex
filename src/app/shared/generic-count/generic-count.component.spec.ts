import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericCountComponent } from './generic-count.component';

describe('GenericCountComponent', () => {
  let component: GenericCountComponent;
  let fixture: ComponentFixture<GenericCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
