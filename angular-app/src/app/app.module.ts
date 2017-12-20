import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DataService } from './data.service';
import { DisplayallComponent } from './displayall/displayall.component';
import { DisplayoneComponent } from './displayone/displayone.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ReqconfirmComponent } from './reqconfirm/reqconfirm.component';
import { InviteComponent } from './invite/invite.component';
import { FrequencyComponent } from './frequency/frequency.component';
import { NeweventComponent } from './newevent/newevent.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarService } from './calendar.service';
import { CategoryService } from './category-service.service';
import { InterestService } from './interests.service';
import { UserService } from './user.service';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DisplayallComponent,
    DisplayoneComponent,
    DashboardComponent,
    ConfirmComponent,
    ReqconfirmComponent,
    InviteComponent,
    FrequencyComponent,
    NeweventComponent,
    CalendarComponent,
    CalendarHeaderComponent,
    DateTimePickerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
  ],
  providers: [DataService, CategoryService,CalendarService, InterestService, UserService],
  bootstrap: [AppComponent]
})

export class AppModule { }
