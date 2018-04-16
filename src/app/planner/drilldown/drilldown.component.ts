import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoalService } from '../goal.service';

@Component({
  selector: 'app-drilldown',
  templateUrl: './drilldown.component.html',
  styleUrls: ['./drilldown.component.css']
})
export class DrilldownComponent implements OnInit {

  date: Date;
  currMonthGoals: [any];

  getSub;

  constructor(private activatedRoute: ActivatedRoute, private goalService: GoalService) { }

  ngOnInit() {
    this.getParams();
    this.getCurrMonthGoals();
  }

  getParams() {
    this.activatedRoute.params
      .subscribe((params) => {
        this.date = new Date(Number(params.date));
      });
  }

  getCurrMonthGoals() {
    if (this.getSub) {
      this.getSub.unsubscribe();
    }

    // Get the epoch time for the current month
    const currMonthDate = this.date;
    const currMonthEpoch = currMonthDate.getTime();

    // Get the epoch time for next month
    const nextMonthDate = currMonthDate;
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    const nextMonthEpoch = nextMonthDate.getTime();

    // Get goals that are due this month
    this.getSub = this.goalService.getGoals(currMonthEpoch, nextMonthEpoch)
      .subscribe((data: any) => {
        this.currMonthGoals = data;
      });
  }
}
