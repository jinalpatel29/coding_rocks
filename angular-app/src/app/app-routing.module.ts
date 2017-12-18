import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NewComponent } from './new/new.component';
import { HomeComponent } from './home/home.component';
import { DisplayallComponent } from './displayall/displayall.component';
import { DisplayoneComponent } from './displayone/displayone.component';


const routes: Routes = [

  { path: '', pathMatch: 'full', component: HomeComponent }, 
  { path: 'dashboard', pathMatch: 'full', component: DisplayallComponent },
  { path: 'create', pathMatch: 'full', component: NewComponent },
  { path: 'poll', pathMatch: 'full', component: DisplayoneComponent },
  { path: 'poll/:id', pathMatch: 'full', component: DisplayoneComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
