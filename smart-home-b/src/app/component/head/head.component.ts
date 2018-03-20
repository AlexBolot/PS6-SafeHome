import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  ajouterIncident = 'not-selected';
  mesIncidents = 'not-selected';
  constructor(private location : Location) { }

  ngOnInit() {
  }
  coverBtnDeconnexion(){
    return location.pathname != "/connexion";
  }
  updateColorBtn(){
    this.mesIncidents = 'not-selected';
    this.ajouterIncident = 'not-selected';

    if(location.pathname =="/issueForm")
      this.ajouterIncident = 'selected';
    else if (location.pathname =='/issueView')
      this.mesIncidents = 'selected';

  }
  goTo() {

  }

}
