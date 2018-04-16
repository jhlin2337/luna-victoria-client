import { Component, OnInit, Input } from '@angular/core';
import { GoalService } from '../../goal.service';

@Component({
  selector: 'app-monthly-goals-card',
  templateUrl: './monthly-goals-card.component.html',
  styleUrls: ['./monthly-goals-card.component.css']
})
export class MonthlyGoalsCardComponent implements OnInit {

  @Input() month;
  year: number;
  currMonthGoals: [any];

  constructor(private goalService: GoalService) {
    this.year = new Date().getFullYear();
  }

  ngOnInit() {
    const currMonthDate = new Date(this.month + ' ' + this.year);
    const currMonthEpoch = currMonthDate.getTime();

    const nextMonthDate = currMonthDate;
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    const nextMonthEpoch = nextMonthDate.getTime();

    this.goalService.getGoals(currMonthEpoch, nextMonthEpoch)
      .subscribe((data: any) => {
        this.currMonthGoals = data;
      });
  }

  getRoute() {
    const date = new Date(this.month + ' ' + this.year).getTime();
    return '/planner/' + date;
  }
}
