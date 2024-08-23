import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeExpenseManagementComponent } from './office-expense-management.component';

describe('OfficeExpenseManagementComponent', () => {
  let component: OfficeExpenseManagementComponent;
  let fixture: ComponentFixture<OfficeExpenseManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficeExpenseManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeExpenseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
