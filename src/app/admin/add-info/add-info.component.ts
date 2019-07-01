import { Component, OnInit } from '@angular/core';
import { ApiNeo4jService } from '../../api-neo4j.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.css']
})
export class AddInfoComponent implements OnInit {
  token: string;
  country;
  actualCountry: string;

  errorEmpty:boolean = false;
  errorCreate:boolean = false;
  errorMessage:string = "";



  constructor(private apiNeo4JService: ApiNeo4jService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');

    this.apiNeo4JService.getCountry(this.token)
    .subscribe(response => {
      this.country = response;
      this.actualCountry = this.country[0];

    },
    error => {
      console.log(error);
    });
  }

  changeCountry(selectedCountry){
    this.actualCountry = selectedCountry;
  }

  createInfo(newInfo){
    if(newInfo.title == "" || newInfo.content == "")
      this.errorEmpty = true;
    else {
      var body = {
        country : this.actualCountry,
        title : newInfo.title,
        content : newInfo.content,
        id: 0
      }

      this.apiNeo4JService.postInfo(this.token, body)
      .subscribe(response => {
        this.router.navigate([`admin`], {queryParams:{token : this.token}});
      },
      error => {
        this.errorCreate = true;
        this.errorMessage = error;
      });
      this.errorEmpty = false;
    }

  }

}
