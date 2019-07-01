import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionFormComponent } from './connexion-form/connexion-form.component';
import { IndexComponent } from './admin/index/index.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './admin/nav/nav.component';
import { AddInfoComponent } from './admin/add-info/add-info.component';
import { AddEventComponent } from './admin/add-event/add-event.component';
import { ListEventComponent } from './admin/list-event/list-event.component';


const routes: Routes = [
  { path: '',  component: ConnexionFormComponent },
  { path: 'admin',  component: IndexComponent },
  { path: 'addInfo',  component: AddInfoComponent },
  { path: 'addEvent', component: AddEventComponent},
  { path: 'seeEvent', component: ListEventComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ConnexionFormComponent,
    IndexComponent,
    NavComponent,
    AddInfoComponent,
    AddEventComponent,
    ListEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
