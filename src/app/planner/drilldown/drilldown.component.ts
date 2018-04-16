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

  readonly MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                     'August', 'September', 'October', 'November', 'December'];

  getSub;
  postSub;

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
    const currMonthDate = new Date(this.date);
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

  addGoal(goalForm) {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }

    // Communicate to backend to create goal and store it in database
    this.postSub = this.goalService.createGoal(goalForm.value)
      .subscribe((data: any) => {
        this.getCurrMonthGoals();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteGoal() {

  }

  patchGoal() {

  }

  // Shows the deadline date for each of the goals. We did this instead of date pipe because of timezone differences
  getDate(deadline) {
    const offset = (new Date()).getTimezoneOffset();
    const deadlineDate = new Date(deadline);
    deadlineDate.setMinutes(deadlineDate.getMinutes() + offset);

    const month = this.MONTHS[deadlineDate.getMonth()];
    const day = deadlineDate.getDate();
    const year = deadlineDate.getFullYear();

    return month + ' ' + day + ', ' + year;
  }
}
