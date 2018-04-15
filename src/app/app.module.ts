import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PlannerComponent } from './planner/planner.component';
import { DashboardComponent } from './planner/dashboard/dashboard.component';
import { MonthlyGoalsCardComponent } from './planner/dashboard/monthly-goals-card/monthly-goals-card.component';
import { DrilldownComponent } from './planner/drilldown/drilldown.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlannerComponent,
    DashboardComponent,
    MonthlyGoalsCardComponent,
    DrilldownComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
