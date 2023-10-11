import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawDataEmailComponent } from './raw-data-email.component';

describe('RawDataEmailComponent', () => {
  let component: RawDataEmailComponent;
  let fixture: ComponentFixture<RawDataEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawDataEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawDataEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
