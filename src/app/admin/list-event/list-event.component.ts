import { Component, OnInit } from '@angular/core';
import { ApiNeo4jService } from 'src/app/api-neo4j.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent implements OnInit {
  token: string;
  events;

  errorEdit: boolean = false;
  errorMessage: string = "";

  noData:boolean = false;
  
  isModalActive = false;
  editId
  editDate;
  editHour;
  editTitle;
  editDescription;

  constructor(private apiNeo4JService: ApiNeo4jService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');

    this.apiNeo4JService.getEvent(this.token)
    .subscribe(response => {
      this.events = response;
        if(this.events.length > 0)
          this.noData = false;
        else
          this.noData = true;
    },
    error => {
      console.log(error);
    });
  }

  openModal(event){
    this.editTitle = event.title;
    this.editDescription = event.description;
    this.editDate = event.date;
    this.editHour = event.hour;
    this.editId = event.id;
    this.isModalActive = !this.isModalActive;
  }

  closeModal(){
    this.editTitle = "";
    this.editDescription = "";
    this.editId = 0;
    this.editHour = "";
    this.editId = "";
    this.isModalActive = !this.isModalActive;
  }

  validationEdit(eventEdit){
    let title = eventEdit.title;
    let description = eventEdit.description;
    let date = eventEdit.date;
    let hour = eventEdit.hour;
    let id = this.editId

    if(title == "")
      title = this.editTitle;
    if(description == "")
      description = this.editDescription;
    if(date == "")
      date = this.editDate;
    if(hour == "")
      hour = this.editHour;

    var body = {
      id : id,
      title : title,
      description : description,
      date : date,
      hour : hour
    }

    this.apiNeo4JService.putEvent(this.token, body)
    .subscribe(response => {
      this.closeModal();
      location.reload();
    },
    error => {
      this.errorEdit = true;
      this.errorMessage = error;
    });
    
  }

  deleteEvent(event){
    if(confirm("Etes vous sûr de vouloir supprimer " + event.title)) {
      this.apiNeo4JService.deleteEvent(this.token, event.id)
      .subscribe(response => {
        console.log(response);
        location.reload();
      },
      error => {
        console.log(error);
      });
    }

  }

}
