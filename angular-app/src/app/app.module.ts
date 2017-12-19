import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { DataService } from './data.service';
import { DisplayallComponent } from './displayall/displayall.component';
import { DisplayoneComponent } from './displayone/displayone.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ReqconfirmComponent } from './reqconfirm/reqconfirm.component';
import { InviteComponent } from './invite/invite.component';
import { FrequencyComponent } from './frequency/frequency.component';
import { NeweventComponent } from './newevent/newevent.component';

import { CategoryService } from './category-service.service';
import { InterestService } from './interests.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewComponent,
    DisplayallComponent,
    DisplayoneComponent,
    DashboardComponent,
    ConfirmComponent,
    ReqconfirmComponent,
    InviteComponent,
    FrequencyComponent,
    NeweventComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DataService, CategoryService, InterestService],
  bootstrap: [AppComponent]
})

export class AppModule { }
