import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiNeo4jService } from '../../api-neo4j.service';
import { Info } from 'src/app/info.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  token: string;
  country;
  infos;
  actualCountry: string;

  isModalActive: boolean = false;

  editTitle: string;
  editContent: string;
  editId: number;

  errorEdit: boolean = false;
  errorMessage: string;

  noData:boolean = true;

  constructor(private apiNeo4JService: ApiNeo4jService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');

    this.apiNeo4JService.getCountry(this.token)
    .subscribe(response => {
      this.country = response;
      this.actualCountry = this.country[0];

      this.apiNeo4JService.getInfo(this.token, this.actualCountry)
      .subscribe(response => {
        this.infos = response;
        if(this.infos.length > 0)
          this.noData = false;
        else
          this.noData = true;
      },
      error => {
        console.log(error);
      });

    },
    error => {
      console.log(error);
    });

  }

  changeCountry(selectedCountry){
    this.infos = [];
    this.apiNeo4JService.getInfo(this.token, selectedCountry)
    .subscribe(response => {
      this.infos = response;
      this.actualCountry = selectedCountry
      if(this.infos.length > 0)
          this.noData = false;
        else
          this.noData = true;
    },
    error => {
      console.log(error);
    });
  }

  openModal(info){
    this.editTitle = info.title;
    this.editContent = info.content;
    this.editId = info.id;
    this.isModalActive = !this.isModalActive;
  }

  closeModal(){
    this.editTitle = "";
    this.editContent = "";
    this.editId = 0;
    this.isModalActive = !this.isModalActive;
  }

  validationEdit(infoEdit){
    let title = infoEdit.title;
    let content = infoEdit.content;
    let id = this.editId

    if(title == "")
      title = this.editTitle;
    if(content == "")
      content = this.editContent;

    var body = {
      id : id,
      title : title,
      content : content,
      country : this.actualCountry
    }

    this.apiNeo4JService.putInfo(this.token, body)
    .subscribe(response => {
      this.closeModal();
      this.changeCountry(this.actualCountry);
    },
    error => {
      this.errorEdit = true;
      this.errorMessage = error;
    });
    
  }

  deleteInfo(info){
    if(confirm("Etes vous sûr de vouloir supprimer " + info.title)) {
      this.apiNeo4JService.deleteInfo(this.token, info.id)
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
