import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandProductComponent } from './brand-product.component';

describe('BrandProductComponent', () => {
  let component: BrandProductComponent;
  let fixture: ComponentFixture<BrandProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
