import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAddressesComponent } from './no-addresses.component';

describe('NoAddressesComponent', () => {
  let component: NoAddressesComponent;
  let fixture: ComponentFixture<NoAddressesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoAddressesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
