import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsProcessComponent } from './docs-process.component';

describe('DocsProcessComponent', () => {
  let component: DocsProcessComponent;
  let fixture: ComponentFixture<DocsProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocsProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocsProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
