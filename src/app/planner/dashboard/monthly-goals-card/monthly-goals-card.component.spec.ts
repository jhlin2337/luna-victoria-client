import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyGoalsCardComponent } from './monthly-goals-card.component';

describe('MonthlyGoalsCardComponent', () => {
  let component: MonthlyGoalsCardComponent;
  let fixture: ComponentFixture<MonthlyGoalsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyGoalsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyGoalsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
