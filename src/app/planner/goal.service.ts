import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AppSettings } from '../app-settings';

@Injectable()
export class GoalService {

  readonly BASE_URL = AppSettings.API_ENDPOINT + 'goals/';
  options: RequestOptions;

  constructor(private http: Http) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${localStorage.getItem(AppSettings.JWT_TOKEN)}`);
    this.options = new RequestOptions({ headers: headers });
  }

  getGoals(startDate: number, endDate: number) {
    const url = this.BASE_URL + startDate + '/' + endDate;

    return this.http.get(url, this.options).map((response: Response) => response.json());
  }

  updateGoal(goalId: string, data: any) {
    const url = this.BASE_URL + goalId;

    return this.http.patch(url, data, this.options).map((response: Response) => response.json());
  }

  createGoal(data: any) {
    const url = this.BASE_URL;

    return this.http.post(url, data, this.options).map((response: Response) => response.json());
  }

  deleteGoal(goalId: string) {
    const url = this.BASE_URL + goalId;

    return this.http.delete(url, this.options).map((response: Response) => response.json());
  }
}
