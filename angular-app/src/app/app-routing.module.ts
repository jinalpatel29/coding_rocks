import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DisplayallComponent } from './displayall/displayall.component';
import { DisplayoneComponent } from './displayone/displayone.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ReqconfirmComponent } from './reqconfirm/reqconfirm.component';
import { InviteComponent } from './invite/invite.component';
import { FrequencyComponent } from './frequency/frequency.component';
import { NeweventComponent } from './newevent/newevent.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent }, 
  { path: 'quiz', pathMatch: 'full', component: DisplayallComponent },
  // { path: 'poll', pathMatch: 'full', component: DisplayoneComponent },
  { path: 'quiz/subcategories/:id', pathMatch: 'full', component: DisplayoneComponent },
  { path: 'dashboard', pathMatch: 'full', component: DashboardComponent },
  { path: 'confirmlove', pathMatch: 'full', component: ConfirmComponent },
  { path: 'requests', pathMatch: 'full', component: ReqconfirmComponent },
  { path: 'invite', pathMatch: 'full', component: InviteComponent },
  { path: 'freqset', pathMatch: 'full', component: FrequencyComponent },
  { path: 'item', pathMatch: 'full', component: NeweventComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
