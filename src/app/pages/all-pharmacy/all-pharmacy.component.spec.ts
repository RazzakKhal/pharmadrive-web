import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPharmacyComponent } from './all-pharmacy.component';

describe('AllPharmacyComponent', () => {
  let component: AllPharmacyComponent;
  let fixture: ComponentFixture<AllPharmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPharmacyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
