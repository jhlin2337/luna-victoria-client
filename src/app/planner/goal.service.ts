import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { UserService } from '../home/user.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AppSettings } from '../app-settings';

@Injectable()
export class GoalService {

  readonly BASE_URL = AppSettings.API_ENDPOINT + 'goals/';

  constructor(private http: Http, private userService: UserService) { }

  getGoals(startDate: number, endDate: number) {
    const url = this.BASE_URL + startDate + '/' + endDate;
    const options = this.getOptions();

    return this.http.get(url, options).map((response: Response) => response.json());
  }

  updateGoal(goalId: string, data: any) {
    const url = this.BASE_URL + goalId;
    const options = this.getOptions();

    return this.http.patch(url, data, options).map((response: Response) => response.json());
  }

  createGoal(data: any) {
    const url = this.BASE_URL;
    const options = this.getOptions();

    return this.http.post(url, data, options).map((response: Response) => response.json());
  }

  deleteGoal(goalId: string) {
    const url = this.BASE_URL + goalId;
    const options = this.getOptions();

    return this.http.delete(url, options).map((response: Response) => response.json());
  }

  getOptions(): RequestOptions {
    const token = this.userService.getToken();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);
    return new RequestOptions({ headers: headers });
  }
}
