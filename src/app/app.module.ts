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
import { NavbarComponent } from './planner/navbar/navbar.component';

import { UserService } from './home/user.service';
import { GoalService } from './planner/goal.service';

import { Guard } from './guard';

const routes = [
  { path: '', component: HomeComponent },
  { path: 'planner', component: PlannerComponent, canActivate: [Guard], children: [
    { path: '', component: DashboardComponent, pathMatch: 'full' },
    { path: ':date', component: DrilldownComponent }
  ] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlannerComponent,
    DashboardComponent,
    MonthlyGoalsCardComponent,
    DrilldownComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [UserService, GoalService, Guard],
  bootstrap: [AppComponent]
})
export class AppModule { }
