import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationListEmailComponent } from './application-list-email.component';

describe('ApplicationListEmailComponent', () => {
  let component: ApplicationListEmailComponent;
  let fixture: ComponentFixture<ApplicationListEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationListEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationListEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
