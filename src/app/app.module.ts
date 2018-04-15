import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PlannerComponent } from './planner/planner.component';
import { DashboardComponent } from './planner/dashboard/dashboard.component';
import { MonthlyGoalsCardComponent } from './planner/dashboard/monthly-goals-card/monthly-goals-card.component';
import { DrilldownComponent } from './planner/drilldown/drilldown.component';

import { UserService } from './home/user.service';
import { GoalService } from './planner/goal.service';

const routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'monthly-planner', component: DrilldownComponent },
  { path: '**', redirectTo: '/' }
];

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
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [UserService, GoalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
