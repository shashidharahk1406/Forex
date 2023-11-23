import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkActionsLayoutComponent } from './bulk-actions-layout.component';

describe('BulkActionsLayoutComponent', () => {
  let component: BulkActionsLayoutComponent;
  let fixture: ComponentFixture<BulkActionsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkActionsLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkActionsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
