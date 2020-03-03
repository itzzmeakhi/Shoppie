import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressViewEditComponent } from './address-view-edit.component';

describe('AddressViewEditComponent', () => {
  let component: AddressViewEditComponent;
  let fixture: ComponentFixture<AddressViewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressViewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
