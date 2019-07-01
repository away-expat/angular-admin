import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiNeo4jService } from 'src/app/api-neo4j.service';
import { City } from 'src/app/city.model';
import { Activity } from 'src/app/activity.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  token: string;
  cities;
  actualActivity;
  actualCity: City;
  arrayofActivity;

  citySelected = false;
  activitySelected = false;
  activityArrayShow = false;

  errorEmpty:boolean = false;
  errorCreate:boolean = false;
  errorMessage:string = "";

  constructor(private apiNeo4JService: ApiNeo4jService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
    
  }

  changeCity(selectedCity){
    this.actualCity = selectedCity;
  }

  autocomplete(selectedCity){
    if(selectedCity.length > 2){
      this.apiNeo4JService.getCity(selectedCity)
      .subscribe(response => {
        this.actualCity = response;
        this.citySelected = true;
      },
      error => {
        console.log(error);
      });
    }
  }

  autocompleteActivity(selectedActivity){
    if(selectedActivity.length > 2){
      this.apiNeo4JService.getActivity(this.token, selectedActivity, this.actualCity.location)
      .subscribe(response => {
        this.arrayofActivity = response;
        this.activityArrayShow = true;
      },
      error => {
        console.log(error);
      });
    }
  }

  selecteActivity(activity){
    this.actualActivity = activity;
    this.activityArrayShow = false;
    this.activitySelected = true;
  }

  createEvent(event){
    if(event.title == "" || event.description == "" || event.date == "" || event.hour == "" || this.actualCity.name == "" || this.actualActivity.name  == "")
      this.errorEmpty = true;
    else {
      var eventBody = {
        idActivity : this.actualActivity.id,
        title : event.title,
        description : event.description,
        date : event.date,
        hour : event.hour,
      }
      
      this.apiNeo4JService.postEvent(this.token, eventBody)
      .subscribe(response => {
        this.router.navigate([`seeEvent`], {queryParams:{token : this.token}});
      },
      error => {
        this.errorCreate = true;
        this.errorMessage = error;
      });
      this.errorEmpty = false;
      
    }

  }

}
