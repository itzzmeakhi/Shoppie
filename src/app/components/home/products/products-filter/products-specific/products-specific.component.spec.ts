import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSpecificComponent } from './products-specific.component';

describe('ProductsSpecificComponent', () => {
  let component: ProductsSpecificComponent;
  let fixture: ComponentFixture<ProductsSpecificComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsSpecificComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
