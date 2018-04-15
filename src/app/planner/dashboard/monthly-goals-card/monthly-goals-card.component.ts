import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-monthly-goals-card',
  templateUrl: './monthly-goals-card.component.html',
  styleUrls: ['./monthly-goals-card.component.css']
})
export class MonthlyGoalsCardComponent implements OnInit {

  @Input() month;

  year;

  constructor() {
    this.year = new Date().getFullYear();
  }

  ngOnInit() {
  }

}
