import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  token: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

}
