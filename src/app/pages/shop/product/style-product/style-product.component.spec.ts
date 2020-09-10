import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleProductComponent } from './style-product.component';

describe('StyleProductComponent', () => {
  let component: StyleProductComponent;
  let fixture: ComponentFixture<StyleProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyleProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
