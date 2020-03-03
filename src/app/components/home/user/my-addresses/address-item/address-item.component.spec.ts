import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressItemComponent } from './address-item.component';

describe('AddressItemComponent', () => {
  let component: AddressItemComponent;
  let fixture: ComponentFixture<AddressItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
