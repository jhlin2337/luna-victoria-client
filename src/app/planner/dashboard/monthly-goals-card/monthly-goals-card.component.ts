import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GoalService } from '../../goal.service';
import { UserService } from '../../../home/user.service';

@Component({
  selector: 'app-monthly-goals-card',
  templateUrl: './monthly-goals-card.component.html',
  styleUrls: ['./monthly-goals-card.component.css']
})
export class MonthlyGoalsCardComponent implements OnInit {

  @Input() month;
  year: number;
  currMonthGoals: [any];

  getSub;
  postSub;

  constructor(private goalService: GoalService, private userService: UserService, private router: Router) {
    this.year = new Date().getFullYear();
  }

  ngOnInit() {
    this.getGoalsData();
  }

  getGoalsData() {
    if (this.getSub) {
      this.getSub.unsubscribe();
    }

    // Get the epoch time for the current month
    const currMonthDate = new Date(this.month + ' ' + this.year);
    const currMonthEpoch = currMonthDate.getTime();

    // Get the epoch time for next month
    const nextMonthDate = currMonthDate;
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    const nextMonthEpoch = nextMonthDate.getTime();

    // Get goals that are due this month
    this.getSub = this.goalService.getGoals(currMonthEpoch, nextMonthEpoch)
      .subscribe((data: any) => {
        this.currMonthGoals = data;
      }, (err) => {
        if (err.status === 401) {
          this.logout();
        }
      });
  }

  toggleComplete(goal, index) {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }

    // Get information for patch
    const id = goal._id;
    const patch = {
      completed: !goal.completed
    };

    // Mark the goal as complete or incomplete
    this.postSub = this.goalService.updateGoal(id, patch)
      .subscribe((data: any) => {
        this.currMonthGoals[index].completed = patch.completed;
      }, (err) => {
        if (err.status === 401) {
          this.logout();
        }
      });
  }

  getRoute() {
    const date = new Date(this.month + ' ' + this.year).getTime();
    return '/planner/' + date;
  }

  // Log user out by redirecting them to home page and clearing jwt token
  logout() {
    this.userService.logout();
  }
}
