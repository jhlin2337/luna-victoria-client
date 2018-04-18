import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoalService } from '../goal.service';
import { UserService } from '../../home/user.service';

@Component({
  selector: 'app-drilldown',
  templateUrl: './drilldown.component.html',
  styleUrls: ['./drilldown.component.css']
})
export class DrilldownComponent implements OnInit {

  date: Date;
  currMonthGoals: [any];
  modalEditGoal = {
    _id: '',
    title: '',
    description: '',
    deadline: '2018-01-01'
  };

  readonly MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                     'August', 'September', 'October', 'November', 'December'];

  getSub;
  postSub;
  patchSub;
  deleteSub;

  constructor(private activatedRoute: ActivatedRoute, private goalService: GoalService, private userService: UserService) { }

  ngOnInit() {
    this.getParams();
    this.getCurrMonthGoals();
  }

  getParams() {
    // Get parameters from url
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
      }, (err) => {
        if (err.status === 401) {
          this.userService.logout();
        }
      });
  }

  addGoal(goalForm) {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }

    // Adjusts deadline date. Necessary because of UTC time difference
    const offset = (new Date(goalForm.value.deadline)).getTimezoneOffset();
    const deadlineDate = new Date(goalForm.value.deadline);
    deadlineDate.setMinutes(deadlineDate.getMinutes() + offset);
    goalForm.value.deadline = deadlineDate;

    // Communicate to backend to create goal and store it in database
    this.postSub = this.goalService.createGoal(goalForm.value)
      .subscribe((data: any) => {
        this.getCurrMonthGoals();
      }, (err) => {
        if (err.status === 401) {
          this.userService.logout();
        }
      });
  }

  deleteGoal() {
    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }

    // Make delete request
    this.deleteSub = this.goalService.deleteGoal(this.modalEditGoal._id)
      .subscribe((data: any) => {
        this.getCurrMonthGoals();
      }, (err) => {
        if (err.status === 401) {
          this.userService.logout();
        }
      });
  }

  patchGoal() {
    if (this.patchSub) {
      this.patchSub.unsubscribe();
    }

    // Get parameters for the patch
    const id = this.modalEditGoal._id;
    const patch = {
      title: this.modalEditGoal.title,
      description: this.modalEditGoal.description,
      deadline: new Date(this.modalEditGoal.deadline)
    };

    // Adjusts deadline date. Necessary because of UTC time difference
    const offset = (new Date(patch.deadline)).getTimezoneOffset();
    const deadlineDate = new Date(patch.deadline);
    deadlineDate.setMinutes(deadlineDate.getMinutes() + offset);
    patch.deadline = deadlineDate;

    // Make patch request
    this.patchSub = this.goalService.updateGoal(id, patch)
      .subscribe((data: any) => {
        this.getCurrMonthGoals();
      }, (err) => {
        if (err.status === 401) {
          this.userService.logout();
        }
      });
  }

  // Set global variable to equal goal in order to display in modal
  setEditValues(goal) {
    this.modalEditGoal = Object.assign({}, goal);
    this.modalEditGoal.deadline = this.modalEditGoal.deadline.slice(0, 10);
  }
}
