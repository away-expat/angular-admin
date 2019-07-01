import { Component, OnInit } from '@angular/core';
import { ApiNeo4jService } from '../api-neo4j.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion-form',
  templateUrl: './connexion-form.component.html',
  styleUrls: ['./connexion-form.component.css']
})
export class ConnexionFormComponent implements OnInit {
  errorConnexion = false;

  constructor(private apiNeo4JService: ApiNeo4jService, private router: Router) { }

  ngOnInit() {

  }

  connexion(userConnexion){
    let mail = userConnexion.email;
    let password = userConnexion.password;
    if(mail != "away@gmail.com")
      this.errorConnexion = true;
    else {
      this.apiNeo4JService.login(mail, password)
      .subscribe(response => {
        if(response.token){
          this.router.navigate([`admin`], {queryParams:{token : response.token}});
        } else {
          this.errorConnexion = true;
        }
      },
      error => {
        this.errorConnexion = true;
      });
    }

    
    
  }

}
