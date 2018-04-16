import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AppSettings } from '../app-settings';

@Injectable()
export class GoalService {

  readonly BASE_URL = AppSettings.API_ENDPOINT + 'goals/';

  constructor(private http: Http) { }

  getGoals(startDate: number, endDate: number) {
    const url = this.BASE_URL + startDate + '/' + endDate;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${localStorage.getItem(AppSettings.JWT_TOKEN)}`);
    const options = new RequestOptions({ headers: headers });

    return this.http.get(url, options).map((response: Response) => response.json());
  }

}
