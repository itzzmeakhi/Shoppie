import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInsightsComponent } from './user-insights.component';

describe('UserInsightsComponent', () => {
  let component: UserInsightsComponent;
  let fixture: ComponentFixture<UserInsightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInsightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
