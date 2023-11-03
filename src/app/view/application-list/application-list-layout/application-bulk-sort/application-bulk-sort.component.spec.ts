import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationBulkSortComponent } from './application-bulk-sort.component';

describe('ApplicationBulkSortComponent', () => {
  let component: ApplicationBulkSortComponent;
  let fixture: ComponentFixture<ApplicationBulkSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationBulkSortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationBulkSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
