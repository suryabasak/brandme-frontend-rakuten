import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CognosComponent } from './cognos.component';

describe('CognosComponent', () => {
  let component: CognosComponent;
  let fixture: ComponentFixture<CognosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CognosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CognosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
