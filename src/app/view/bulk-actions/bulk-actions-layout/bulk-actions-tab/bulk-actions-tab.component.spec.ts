import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkActionsTabComponent } from './bulk-actions-tab.component';

describe('BulkActionsTabComponent', () => {
  let component: BulkActionsTabComponent;
  let fixture: ComponentFixture<BulkActionsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkActionsTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkActionsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
