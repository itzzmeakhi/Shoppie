import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSellerComponent } from './add-seller.component';

describe('AddSellerComponent', () => {
  let component: AddSellerComponent;
  let fixture: ComponentFixture<AddSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
